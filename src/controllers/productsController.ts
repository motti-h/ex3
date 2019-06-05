import { Router } from 'express';
import * as ProductsHendlers from '../routesHendlers/ProductsHendlers';
import * as asyncMaker from '../utils/async';

const productRouter = Router();

productRouter.use('/:id', ProductsHendlers.middleCheckId); // middleware id check

productRouter.get('/', ProductsHendlers.productGetHandler);

// get specific product is ASYNC 
productRouter.get('/:id', asyncMaker.wrapAsyncAndSend(ProductsHendlers.productGetSpecificHandler) );

productRouter.delete('/:id', ProductsHendlers.productDeleteHandler);
productRouter.use('/', ProductsHendlers.middleCheckName); // middleware name check

productRouter.post('/', ProductsHendlers.productPostHandler);

productRouter.put('/:id', ProductsHendlers.productPutHandler);

productRouter.use(ProductsHendlers.endError);
export { productRouter };
