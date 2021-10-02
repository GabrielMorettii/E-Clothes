import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DecrementTransactionService {
  public async execute(id: string, decrement: number): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!validate(id)) {
      throw new AppError('ID is not valid');
    }

    const transactionExistent = await transactionsRepository.findOne(id);

    if (!transactionExistent) {
      throw new AppError('This transaction not exists');
    }

    await transactionsRepository.decrement({ id }, 'quantity', decrement);
  }
}

export default DecrementTransactionService;
