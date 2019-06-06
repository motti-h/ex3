import { Router } from 'express';
import * as categoryHendlers from '../routesHendlers/CategorysHendlers';
import * as util from '../utils//utils';

const categoryRouter = Router();
categoryRouter.use('/:id', util.middleCheckId);

categoryRouter.get('/', categoryHendlers.categoryGetHandler);

categoryRouter.get('/:id/products', categoryHendlers.categoryGetProductsByIdHandler);

categoryRouter.get('/:id', categoryHendlers.categoryGetByIdHandler);

categoryRouter.post('/', categoryHendlers.categoryPostHandler);

categoryRouter.put('/:id', categoryHendlers.categoryPutHandler);

categoryRouter.delete('/:id', categoryHendlers.categoryDeleteHandler);

categoryRouter.use(util.endError);

export {categoryRouter};
