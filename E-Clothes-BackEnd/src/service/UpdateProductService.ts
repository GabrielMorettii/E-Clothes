import { validate } from 'uuid';
import { getRepository } from 'typeorm';

import Product from '../models/Product';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  title: string;
  value: number;
  cover: string;
  sold: number;
  available: number;
}

class UpdateProductService {
  public async execute({
    id,
    title,
    value,
    cover,
    sold,
    available,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    if (!validate(id)) {
      throw new AppError('ID is not valid');
    }

    let productExistent = await productsRepository.findOne({ where: { id } });

    if (!productExistent) {
      throw new AppError('This product not exists');
    }

    const newProduct = {
      ...productExistent,
      title,
      value,
      cover,
      sold,
      available,
    };

    productExistent = newProduct;

    await productsRepository.save(productExistent);

    return productExistent;
  }
}

export default UpdateProductService;
