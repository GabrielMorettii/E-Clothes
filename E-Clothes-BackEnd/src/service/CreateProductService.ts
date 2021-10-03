import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Product from '../models/Product';

interface Request {
  title: string;
  value: number;
  cover: string;
  available: number;
  sold: number;
}

class CreateProductService {
  public async execute({
    title,
    value,
    cover,
    available,
    sold,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const coverAlreadyExists = await productsRepository.findOne({ cover });

    if (coverAlreadyExists) {
      throw new AppError('this image is already used by another product');
    }

    const product = productsRepository.create({
      title,
      value,
      cover,
      available,
      sold,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
