import{g as n}from"./utils-B2y0dHph.js";function l(){const t=n("so-cart"),a=t.map(e=>i(e));document.querySelector(".product-list").innerHTML=a.join(""),s(t)}function s(t){const a=document.querySelector(".cart-footer"),e=document.querySelector("#cartTotal");if(t.length>0){a.classList.remove("hide");const r=t.reduce((c,o)=>c+parseFloat(o.FinalPrice),0);e.textContent=r.toFixed(2)}}function i(t){return`<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img src='${t.Image}' alt='${t.Name}' />
  </a>
  <a href='#'>
    <h2 class='card__name'>${t.Name}</h2>
  </a>
  <p class='cart-card__color'>${t.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${t.FinalPrice}</p>
</li>`}l();
