import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../service/CreateTransactionService';
import DeleteTransactionService from '../service/DeleteTransactionService';

const cartRouter = Router();

cartRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();

  return response.json({ transactions, balance });
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

cartRouter.put('/', async (request, response) => {
  const id = request.params;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    product_id,
    quantity,
  });

  return response.json(transaction);
});

cartRouter.delete('/:id', async (request, response) => {
  const id = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute(id);

  return response.status(204).send();
});

export default cartRouter;
