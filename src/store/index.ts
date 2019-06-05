import { Product } from '../models';
import { Category } from '../models';
import * as products from './products.json';
import * as categories from './categories.json';

interface Store {
  products: Product[];
  categories: Category[]; 
}

const store: Store = {
  products,
  categories,
};

export { store };