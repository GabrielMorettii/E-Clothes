import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../service/CreateTransactionService';
import DeleteTransactionService from '../service/DeleteTransactionService';
import DecrementTransactionService from '../service/DecrementTransactionService';
import IncrementTransactionService from '../service/IncrementTransactionService';

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

cartRouter.put('/decrement/:id', async (request, response) => {
  const { id } = request.params;

  const decrementTransaction = new DecrementTransactionService();

  await decrementTransaction.execute(id);

  return response.status(204).send();
});

cartRouter.put('/increment/:id', async (request, response) => {
  const { id } = request.params;

  const incrementTransaction = new IncrementTransactionService();

  await incrementTransaction.execute(id);

  return response.status(204).send();
});

cartRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute(id);

  return response.status(204).send();
});

export default cartRouter;
