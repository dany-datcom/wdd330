import{l as o,g as n}from"./utils-B3h4IoC7.js";function s(){const t=n("so-cart")||[],r=document.querySelector(".product-list"),a=document.querySelector(".cart-footer");if(!r)return;const c=t.map(l);if(r.innerHTML=c.join(""),t.length>0){a?.classList.remove("hide");const e=i(t);document.querySelector("#cartTotal").textContent=e.toFixed(2)}else a?.classList.add("hide")}function i(t){return t.reduce((r,a)=>{const c=parseFloat(a.FinalPrice)||0,e=a.Quantity||1;return r+c*e},0)}function l(t){const r=t.Colors?.[0]?.ColorName||"N/A";return`<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img src='${t.Images?.PrimaryMedium||""}' alt='${t.Name}' />
    </a>
    <a href='#'>
      <h2 class='card__name'>${t.Name}</h2>
    </a>
    <p class='cart-card__color'>${r}</p>
    <p class='cart-card__quantity'>qty: ${t.Quantity||1}</p>
    <p class='cart-card__price'>$${t.FinalPrice}</p>
  </li>`}async function d(){try{await o(),s()}catch(t){console.error("Error initializing cart page:",t)}}d();
