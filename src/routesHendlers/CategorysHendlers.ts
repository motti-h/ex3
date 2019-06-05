import { Category } from '../models';
import { Product } from '../models';
import { store } from '../store';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import * as categoryUtils from '../utils/categoryUtils';
const categories = store.categories;
const products = store.products;

export function categoryGetHandler(req: Request, res: Response, next: NextFunction): any {
    res.send(categories);
}

export function categoryGetproductsByIdHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id; // url params

    if ( isNaN(id) ) {
        next(new Error('400'));
        return;
    }
    const existing = categoryUtils.isCategoryExist(id);

    if (!existing) {
        next(new Error('404'));
        return;
    }
    const productsArr: Product[] = new Array<Product>();
    for (const item of products) {
        if (item.categoryId === existing.id) {
            productsArr.push(item);
        }
    }
    res.send(productsArr);
}

export function categoryGetByIdHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id; // url params

    if ( isNaN(id) ) {
        next(new Error('400'));
        return;
    }
    const existing = categoryUtils.isCategoryExist(id);

    if (!existing) {
        next(new Error('404'));
        return;
    }

    res.send(existing);
}

export function categoryPostHandler(req: Request, res: Response, next: NextFunction): any {
    const newCategory: Category = req.body as Category;
    for (const item of categories) {
        if (item.name === newCategory.name) {
            next(new Error('409'));
            return;
        }
    }
    newCategory.id = (store.products.length + 1).toString();
    store.categories.push(newCategory);
    res.sendStatus(201);
}

export function categoryPutHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;

    if (isNaN(id)) {
        next(new Error('400'));
        return;
    }

    const existing = categoryUtils.isCategoryExist(id);
    if (!existing) {
       next(new Error('404'));
       return;
    }
    const newCategory: Category = req.body as Category;
    (existing.name = newCategory.name);
    res.send(existing);
}

export function categoryDeleteHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id;
    const existingIndex = categories.findIndex(p => p.id === id);

    if (isNaN(id)) {
        next(new Error('400'));
        return;
    }

    if (existingIndex < 0) {
        next('404');
        return;
    }

    categories.splice(existingIndex, 1);
    res.sendStatus(204);
}

export function endError(err: Error , req: Request, res: Response, next: NextFunction) {
    if ( parseInt(err.message, 10) ) {
        res.sendStatus( parseInt(err.message, 10) );
    } else {
        next(err);
    }
}
