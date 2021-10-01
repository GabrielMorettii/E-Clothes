import { Router } from 'express';

import shoppingRouter from './shopping.routes';

const routes = Router();

routes.use('/shopping', shoppingRouter);

export default routes;
