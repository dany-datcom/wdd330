import{l as o,g as s}from"./utils-Cv-KQ1jK.js";function n(){const t=s("so-cart")||[],a=document.querySelector(".product-list"),r=document.querySelector(".cart-footer");if(!a)return;const e=t.map(i);if(a.innerHTML=e.join(""),t.length>0){r?.classList.remove("hide");const c=l(t);document.querySelector("#cartTotal").textContent=c.toFixed(2)}else r?.classList.add("hide")}function l(t){return t.reduce((a,r)=>{const e=parseFloat(r.FinalPrice)||0,c=r.Quantity||1;return a+e*c},0)}function i(t){const a=t.Colors?.[0]?.ColorName||"N/A";return`<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img src='${t.Images?.PrimaryMedium||""}' alt='${t.Name}' />
    </a>
    <a href='#'>
      <h2 class='card__name'>${t.Name}</h2>
    </a>
    <p class='cart-card__color'>${a}</p>
    <p class='cart-card__quantity'>qty: ${t.Quantity||1}</p>
    <p class='cart-card__price'>$${t.FinalPrice}</p>
  </li>`}o();n();
