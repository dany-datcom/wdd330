import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './checkoutProcess.mjs';

async function main() {
  await loadHeaderFooter();

  // 🛒 CHECKOUT
  const form = document.querySelector('#checkoutForm');

  if (form) {
    const checkout = new CheckoutProcess('so-cart', '#order-summary');

    checkout.init();
    checkout.calculateOrderTotal();

    const zipInput = form.querySelector('[name="zip"]');

    if (zipInput) {
      zipInput.addEventListener('change', () => {
        checkout.calculateOrderTotal();
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const valid = form.checkValidity();
      form.reportValidity();

      if (valid) {
        checkout.checkout(form);
      }
    });

    return;
  }

  // 🏕️ PRODUCTOS
  const listElement = document.querySelector('.product-list');

  if (listElement) {
    const category = 'tents';
    const dataSource = new ExternalServices();
    const productList = new ProductList(category, dataSource, listElement);

    await productList.init();
  }
}

main();