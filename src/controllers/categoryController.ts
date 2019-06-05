import { Router } from 'express';
import * as categoryHendlers from '../routesHendlers/CategorysHendlers';

const categoryRouter = Router();

categoryRouter.get('/', categoryHendlers.categoryGetHandler );

categoryRouter.get('/:id/products', categoryHendlers.categoryGetproductsByIdHandler);

categoryRouter.get('/:id', categoryHendlers.categoryGetByIdHandler);

categoryRouter.post('/', categoryHendlers.categoryPostHandler);

categoryRouter.put('/:id', categoryHendlers.categoryPutHandler);

categoryRouter.delete('/:id', categoryHendlers.categoryDeleteHandler);

categoryRouter.use(categoryHendlers.endError);

export {categoryRouter};