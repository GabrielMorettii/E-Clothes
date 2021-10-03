import { getRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../errors/AppError';
import Product from '../models/Product';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getRepository(Product);

    if (!validate(id)) {
      throw new AppError('ID is not valid');
    }

    const productExistent = await productsRepository.findOne({ where: { id } });

    if (!productExistent) {
      throw new AppError('This product not exists');
    }

    await productsRepository.delete(id);
  }
}

export default DeleteProductService;
