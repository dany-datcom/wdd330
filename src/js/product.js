<<<<<<<<< Temporary merge branch 1
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
=========
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
>>>>>>>>> Temporary merge branch 2
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
<<<<<<<<< Temporary merge branch 1
  let cartItems = getLocalStorage("so-cart") || [];
=========
  const cartItems = getLocalStorage("so-cart") || [];
>>>>>>>>> Temporary merge branch 2
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
