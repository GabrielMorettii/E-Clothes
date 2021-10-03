import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!validate(id)) {
      throw new AppError('ID is not valid');
    }

    const transactionExists = await transactionsRepository.findOne({
      where: { id },
    });

    if (!transactionExists) {
      throw new AppError('This product not exists');
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
