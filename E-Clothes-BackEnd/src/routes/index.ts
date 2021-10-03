import { Router } from 'express';

import shoppingRouter from './shopping.routes';
import cartRouter from './cart.routes';

const routes = Router();

routes.use('/shopping', shoppingRouter);
routes.use('/shopping/cart', cartRouter);

export default routes;
