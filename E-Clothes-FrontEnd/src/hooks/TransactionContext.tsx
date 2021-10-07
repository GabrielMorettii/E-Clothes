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
  addNewTransaction(data: TransactionData): Promise<void>;
  getTransactions(): Promise<Response>;
}

const TransactionContext = createContext({} as ITransactionContext);

const TransactionProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<TransactionData[]>([] as TransactionData[]);

  const addNewTransaction = useCallback(
    async ({ product_id, quantity }: TransactionData) => {
      const response = await api.post('/shopping/cart', {
        product_id,
        quantity,
      });

      const transaction = response.data;

      setData([...data, transaction]);
    },
    [data],
  );

  const getTransactions = useCallback(async () => {
    const response = await api.get<Response>('/shopping/cart');

    const allTransactions = response.data;

    return allTransactions;
  }, []);

  return (
    <TransactionContext.Provider value={{ addNewTransaction, getTransactions }}>
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
