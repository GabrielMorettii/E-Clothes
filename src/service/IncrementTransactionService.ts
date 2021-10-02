import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class IncrementTransactionService {
  public async execute(id: string, increment: number): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!validate(id)) {
      throw new AppError('ID is not valid');
    }

    const transactionExistent = await transactionsRepository.findOne(id);

    if (!transactionExistent) {
      throw new AppError('This transaction not exists');
    }

    await transactionsRepository.increment({ id }, 'quantity', increment);
  }
}

export default IncrementTransactionService;
