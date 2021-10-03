import { Repository, EntityRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const total = transactions.reduce(
      (accumulator, transaction) => {
        accumulator.total += Number(transaction.total);

        return accumulator;
      },
      { total: 0 },
    );

    return total;
  }
}

export default TransactionsRepository;
