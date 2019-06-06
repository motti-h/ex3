import { store } from '../store';
import { Product } from '../models';

const products = store.products;

function getAllProducts(): Product[] {
  return products;
}

function findProduct(id: number): Product | undefined {
  return products.find(p => p.id === id.toString());
}

function getProductsLength(): number {
  return products.length;
}

export {
    findProduct,
    getAllProducts,
    getProductsLength,
    Product,
};
