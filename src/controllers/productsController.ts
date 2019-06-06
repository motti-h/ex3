import { Router } from 'express';
import * as ProductsHendlers from '../routesHendlers/ProductsHendlers';
import * as asyncMaker from '../utils/async';
import * as util from '../utils//utils';

const productRouter = Router();

productRouter.use('/:id', util.middleCheckId); // middleware id check

productRouter.get('/', ProductsHendlers.productGetHandler);

productRouter.get('/:id', asyncMaker.wrapAsyncAndSend(ProductsHendlers.productGetSpecificHandler) ); // get specific ASYNC

productRouter.delete('/:id', ProductsHendlers.productDeleteHandler);

productRouter.use('/', ProductsHendlers.middleCheckName); // middleware name check
productRouter.post('/', ProductsHendlers.productPostHandler);

productRouter.put('/:id', ProductsHendlers.productPutHandler);

productRouter.use(util.endError);

export { productRouter };
