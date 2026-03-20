import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const productList = document.querySelector('.product-list');
  const footer = document.querySelector('.cart-footer');

  if (!productList) return;

  const htmlItems = cartItems.map(cartItemTemplate);
  productList.innerHTML = htmlItems.join('');

  if (cartItems.length > 0) {
    footer?.classList.remove('hide');

    const total = calculateTotal(cartItems);
    document.querySelector('#cartTotal').textContent = total.toFixed(2);
  } else {
    footer?.classList.add('hide');
  }
}

function calculateTotal(cartItems) {
  return cartItems.reduce((sum, item) => {
    const price = parseFloat(item.FinalPrice) || 0;
    const qty = item.Quantity || 1;
    return sum + (price * qty);
  }, 0);
}

function cartItemTemplate(item) {
  const color = item.Colors?.[0]?.ColorName || 'N/A';
  const image = item.Images?.PrimaryMedium || '';

  return `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img src='${image}' alt='${item.Name}' />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${color}</p>
    <p class='cart-card__quantity'>qty: ${item.Quantity || 1}</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;
}

// Función principal asíncrona
async function main() {
    try {
        await loadHeaderFooter();  // Espera a que cargue header/footer
        renderCartContents();      // Luego renderiza el carrito
    } catch (error) {
        console.error('Error initializing cart page:', error);
    }
}

// Ejecuta la función principal
main();