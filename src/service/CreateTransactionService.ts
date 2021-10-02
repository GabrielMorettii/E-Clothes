import { getRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';
import Product from '../models/Product';
import Transaction from '../models/Transaction';

interface Request {
  product_id: string;
  quantity: number;
}

class CreateTransactionService {
  public async execute({
    product_id,
    quantity,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getRepository(Transaction);
    const productsRepository = getRepository(Product);

    if (!validate(product_id)) {
      throw new AppError('ID is not valid');
    }

    const productExistent = await productsRepository.findOne({
      where: { product_id },
    });

    if (!productExistent) {
      throw new AppError('This product not exists');
    }

    if (productExistent.available < quantity) {
      throw new AppError('The quantity is above the product stock');
    }

    const total = quantity * Number(productExistent.value);

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
