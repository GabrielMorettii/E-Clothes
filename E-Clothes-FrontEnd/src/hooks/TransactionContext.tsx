import React, { useContext, createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface TransactionData {
  product_id: string;
  quantity: number;
}

interface Balance {
  total: number;
}

interface Response {
  transactions: Array<TransactionData>;
  balance: Balance;
}

interface ITransactionContext {
  addNewTransaction(data: TransactionData): void;
  getTransactions(): Promise<Response>;
  data: Array<TransactionData>;
}

const TransactionContext = createContext({} as ITransactionContext);

const TransactionProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<TransactionData[]>([] as TransactionData[]);

  const addNewTransaction = useCallback(
    ({ product_id, quantity }: TransactionData) => {
      const transactionExistent = data.find(
        transaction => transaction.product_id === product_id,
      );

      if (transactionExistent) {
        transactionExistent.quantity += 1;

        return;
      }

      const newTransaction = { product_id, quantity };

      setData([...data, newTransaction]);
    },
    [data],
  );

  const getTransactions = useCallback(async () => {
    const response = await api.get<Response>('/shopping/cart');

    const allTransactions = response.data;

    return allTransactions;
  }, []);

  return (
    <TransactionContext.Provider
      value={{ data, addNewTransaction, getTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

function useAuth(): ITransactionContext {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider!');
  }

  return context;
}

export { useAuth, TransactionProvider };
