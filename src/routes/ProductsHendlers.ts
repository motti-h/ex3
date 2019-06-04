import { Product } from '../models';
import { store } from '../store';
import { Response, Request, NextFunction, RequestHandler } from 'express';

const products = store.products;
 
export function productGetHandler(req: Request, res: Response, next: NextFunction): any {
    res.send(products);
}

export function productGetSpecificHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id; // url params
    const existing = isProductExist(id);

    if (!existing) {
        next();
    }

    res.send(existing);
}

export function productPostHandler(req: Request, res: Response, next: NextFunction): any { 
    const pr: Product = req.body as Product;
    if( pr.name.length < 3) {
        next();
    }
    pr.id = (store.products.length + 1).toString();
    store.products.push(pr);
    res.sendStatus(201);
}

export function productPutHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;

    if (isNaN(id)) {
        res.send(400);
        return;
    }

    const existing = isProductExist(id);
    if (!existing) {
       next();
       return;
    }
    const newProduct: Product = req.body as Product;
    if ( newProduct.name.length < 3) {
        error409Handler(req, res, next);
        return;
    }
    Object.assign(existing , newProduct);
    res.send(existing);
}

export function productDeleteHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existingIndex = products.findIndex(p => p.id === id);

    if (existingIndex < 0) {
        next();
    }

    products.splice(existingIndex, 1);
    res.sendStatus(204);
}

// error handlers
export function error404Handler(req: Request, res: Response, next: NextFunction): any{
    res.sendStatus(404);
}

export function error409Handler(req: Request, res: Response, next: NextFunction): any{
    res.sendStatus(409);
}

function isProductExist(id: number): Product | undefined {
    return products.find(p => p.id === id.toString());
}
