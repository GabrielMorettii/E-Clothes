import { Router } from 'express';

import { getRepository } from 'typeorm';

import Product from '../models/Product';
import CreateProductService from '../service/CreateProductService';

const shoppingRouter = Router();

shoppingRouter.get('/', async (request, response) => {
  try {
    const productsRepository = getRepository(Product);

    const products = await productsRepository.find();

    return response.json({ products });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

shoppingRouter.post('/', async (request, response) => {
  try {
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
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default shoppingRouter;
