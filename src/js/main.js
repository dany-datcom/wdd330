import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './checkoutProcess.mjs';

async function main() {
  await loadHeaderFooter();

  // 🛒 SI ESTÁS EN CHECKOUT
  const form = document.querySelector('#checkout-form');

  if (form) {
    const checkout = new CheckoutProcess('so-cart', '#order-summary');

    checkout.init();

    form.zip.addEventListener('change', () => {
      checkout.calculateOrderTotal();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      checkout.checkout(form);
    });

    return; // 🔥 IMPORTANTE: no seguir ejecutando lo de productos
  }

  // 🏕️ SI ESTÁS EN PRODUCTOS
  const listElement = document.querySelector('.product-list');

  if (listElement) {
    const category = 'tents';
    const dataSource = new ExternalServices();
    const productList = new ProductList(category, dataSource, listElement);

    await productList.init();
  }
}

main();