import { getCustomRepository, getRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';
import Product from '../models/Product';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DecrementTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const productsRepository = getRepository(Product);

    if (!validate(id)) {
      throw new AppError('ID is not valid');
    }

    const transactionExistent = await transactionsRepository.findOne(id);

    if (!transactionExistent) {
      throw new AppError('This transaction not exists');
    }

    const productOfTransaction = await productsRepository.findOne(
      transactionExistent.product_id,
    );

    if (!productOfTransaction) {
      throw new AppError('This product not exists');
    }

    if (transactionExistent.quantity === 1) {
      throw new AppError('You can not decrement more than 1 product');
    }

    await transactionsRepository.update(id, {
      total: String(
        (transactionExistent.quantity - 1) * Number(productOfTransaction.value),
      ),
    });
    await transactionsRepository.decrement({ id }, 'quantity', 1);
  }
}

export default DecrementTransactionService;
