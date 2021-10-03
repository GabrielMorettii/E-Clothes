import { getCustomRepository, getRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';
import Product from '../models/Product';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  product_id: string;
  quantity: number;
}

class CreateTransactionService {
  public async execute({
    product_id,
    quantity,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const productsRepository = getRepository(Product);

    if (!validate(product_id)) {
      throw new AppError('ID is not valid');
    }

    const productExistent = await productsRepository.findOne({
      where: { id: product_id },
    });

    if (!productExistent) {
      throw new AppError('This product not exists');
    }

    if (productExistent.available < quantity) {
      throw new AppError('The quantity is above the product stock');
    }

    const total = String(quantity * Number(productExistent.value));

    const transaction = transactionsRepository.create({
      product_id,
      total,
      quantity,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
