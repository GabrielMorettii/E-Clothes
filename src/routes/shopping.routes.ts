import { Router } from 'express';

import { getRepository } from 'typeorm';

import Product from '../models/Product';
import CreateProductService from '../service/CreateProductService';

const shoppingRouter = Router();

shoppingRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(Product);

  const products = await productsRepository.find();

  return response.json({ products });
});

shoppingRouter.post('/', async (request, response) => {
  const { title, value, cover, available, sold } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    title,
    value,
    cover,
    available,
    sold,
  });

  return response.json(product);
});

export default shoppingRouter;
