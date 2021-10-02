import { Router } from 'express';
import { getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import CreateTransactionService from '../service/CreateTransactionService';

const cartRouter = Router();

cartRouter.get('/', async (request, response) => {
  const transactionsRepository = getRepository(Transaction);

  const transactions = await transactionsRepository.find();

  return response.json(transactions);
});

cartRouter.post('/', async (request, response) => {
  const { product_id, quantity } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    product_id,
    quantity,
  });

  return response.json(transaction);
});

export default cartRouter;
