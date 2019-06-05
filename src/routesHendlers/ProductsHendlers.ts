import { Product } from '../models';
import { store } from '../store';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import * as productUtils from '../utils/productUtils'
const products = store.products;

export function productGetHandler(req: Request, res: Response, next: NextFunction): any {
    res.send(productUtils.getAllProducts());
}

export function productGetSpecificHandler(req: Request, res: Response, next?: NextFunction): Promise<any> {
    const id = req.params.id; // url params
    const maybeProduct = productUtils.findProduct(id); // async part
    return (maybeProduct) ? Promise.resolve(maybeProduct) : Promise.reject(new Error('404'));

}

export function productPostHandler(req: Request, res: Response, next: NextFunction): any {
    const newProduct: Product = req.body as Product;
    newProduct.id = (productUtils.getProductsLength() + 1).toString();
    store.products.push(newProduct);
    res.sendStatus(201);
}

export function productPutHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existing = productUtils.findProduct(id);

    if (!existing) {
       next(new Error('404'));
       return;
    }

    const newProduct: Product = req.body as Product;

    if ( newProduct.name.length < 3) {
        next(new Error('409'));
        return;
    }

    Object.assign(existing , newProduct);
    res.send(existing);
}

export function productDeleteHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existingIndex = products.findIndex(p => p.id === id);

    if (existingIndex < 0) {
        next(new Error('404'));
    }

    products.splice(existingIndex, 1);
    res.sendStatus(204);
}

export function middleCheckId(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id; // url params

    if (isNaN(id)) {
       next(new Error('400'));
    }

    next();
}

export function middleCheckName(req: Request, res: Response, next: NextFunction): any {
    const newProduct: Product = req.body as Product;

    if ( newProduct.name.length < 3) {
        next(new Error('409'));
        return;
    }

    next();
}

export function endError(err: Error , req: Request, res: Response, next: NextFunction) {
    if( parseInt(err.message, 10) ) {
        res.sendStatus( parseInt(err.message, 10) );
        res.end();
        return;
    } else {
        next(err);
    }
}
