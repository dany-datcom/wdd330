import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';



async function main() {
    const category = getParam('category') || 'tents';

    const listElement = document.querySelector('.product-list');
    if (!listElement) {
        console.error('No se encontró .product-list');
        return;
    }

    const dataSource = new ProductData(category);
    const myList = new ProductList(category, dataSource, listElement);

    try {
        await loadHeaderFooter();
        await myList.init();

        // ✅ AQUÍ va el título
        const title = document.querySelector('.title');
        if (title) {
            title.textContent = category
                .replace('-', ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
        }

    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

main();
