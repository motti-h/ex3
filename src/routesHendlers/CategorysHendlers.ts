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

export function categoryGetProductsByIdHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id; // url params
    const existing = categoryUtils.getCategoryById(id);

    if (!existing) {
        next(new Error('404'));
        return;
    }

    const productsArr = products.filter(product => (product.categoryId === existing.id));
    res.send(productsArr);
}

export function categoryGetByIdHandler(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id; // url params
    const existing = categoryUtils.getCategoryById(id);

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
    const existing = categoryUtils.getCategoryById(id);

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

    if (existingIndex < 0) {
        next('404');
        return;
    }

    categories.splice(existingIndex, 1);
    res.sendStatus(204);
}
