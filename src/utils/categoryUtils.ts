import {store} from '../store';
import {Category} from '../models/category';
const categories = store.categories;
function getAllCategories() : Category[]
{
    return categories;
}

function getCategoryById(id: number): Category | undefined {
    return categories.find(p => p.id === id.toString());
}

function getCategoriesLength(): number {
    return categories.length;
}
export {getCategoryById , getAllCategories, getCategoriesLength }; 
