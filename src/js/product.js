import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';

async function main() {
  const productId = getParam('product');

  if (!productId) {
    console.error('No se encontró el parámetro product');
    return;
  }

  const category = getParam('category') || 'tents';
  const dataSource = new ProductData(category);
  const product = new ProductDetails(productId, dataSource);

  try {
    await loadHeaderFooter();
    await product.init();
  } catch (error) {
    console.error('Error cargando el producto:', error);
  }
}

main();
