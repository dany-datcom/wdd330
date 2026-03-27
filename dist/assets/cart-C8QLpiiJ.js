import{l as s,g as o}from"./utils-DXuv8s1s.js";function n(){const t=o("so-cart")||[],r=document.querySelector(".product-list"),e=document.querySelector(".cart-footer");if(!r)return;const a=t.map(u);if(r.innerHTML=a.join(""),i(),t.length>0){e?.classList.remove("hide");const c=d(t);document.querySelector("#cartTotal").textContent=c.toFixed(2)}else e?.classList.add("hide")}function i(){document.querySelectorAll(".remove-item").forEach(r=>{r.addEventListener("click",e=>{const a=e.target.dataset.id;l(a)})})}function l(t){let r=o("so-cart")||[];r=r.filter(e=>e.Id!==Number(t)),localStorage.setItem("so-cart",JSON.stringify(r)),n()}function d(t){return t.reduce((r,e)=>{const a=parseFloat(e.FinalPrice)||0,c=e.Quantity||1;return r+a*c},0)}function u(t){const r=t.Colors?.[0]?.ColorName||"N/A",e=t.Images?.PrimaryMedium||"";return`<li class='cart-card divider'>
    
    <span class="remove-item" data-id="${t.Id}">❌</span>

    <a href='#' class='cart-card__image'>
      <img src='${e}' alt='${t.Name}' />
    </a>
    <a href='#'>
      <h2 class='card__name'>${t.Name}</h2>
    </a>
    <p class='cart-card__color'>${r}</p>
    <p class='cart-card__quantity'>qty: ${t.Quantity||1}</p>
    <p class='cart-card__price'>$${t.FinalPrice}</p>
  </li>`}async function m(){try{await s(),n()}catch(t){console.error("Error initializing cart page:",t)}}m();
