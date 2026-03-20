import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

async function main() {
    const listElement = document.querySelector('.product-list');

    if (!listElement) {
        console.error('No se encontró .product-list');
        return;
    }

    const category = 'tents';
    const dataSource = new ProductData(category);
    const productList = new ProductList(category, dataSource, listElement);

    try {
        await loadHeaderFooter();
        await productList.init();
    } catch (error) {
        console.error('Error inicializando la página:', error);
    }
}

main();

await loadHeaderFooter();
await ProductList.init();
