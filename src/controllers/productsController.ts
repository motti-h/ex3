import { Application } from 'express';
import * as ProductsHendlers from '../routes/ProductsHendlers'

function setup(app: Application) {

// get all products
  app.get('/products', ProductsHendlers.productGetHandler );

// get specific product
  app.get('/products/:id', ProductsHendlers.productGetSpecificHandler, ProductsHendlers.error404Handler);
  //app.get('/products/:id', );

// post product

  app.post('/products/', ProductsHendlers.productPostHandler, ProductsHendlers.error409Handler);
  //app.post('products/', ProductsHendlers.error409Handler);
  
// put product

  app.put('/products/:id',ProductsHendlers.productPutHandler, ProductsHendlers.error404Handler);

// delete product
  
  app.delete('/products/:id',ProductsHendlers.productDeleteHandler,  ProductsHendlers.error404Handler);
}

export {setup};
