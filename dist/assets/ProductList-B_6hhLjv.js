function s(r){const t=r.Brand?.Name||"Unknown";return`<li class='product-card'>
    <a href='/product_pages/index.html?product=${r.Id}&category=${r.Category}'>
      <img src='${r.Images?.PrimaryMedium}' alt='Image of ${r.Name}'>
      <h2 class='card__brand'>${t}</h2>
      <h3 class='card__name'>${r.Name}</h3>
      <p class='product-card__price'>$${r.FinalPrice}</p>
    </a>
  </li>`}class n{constructor(t,a,e){this.category=t,this.dataSource=a,this.listElement=e}async init(){this.listElement.innerHTML="<p>Loading...</p>";try{const t=await this.dataSource.getData(this.category);if(!t||t.length===0){this.listElement.innerHTML="<p>No products found</p>";return}this.renderList(t)}catch(t){console.error("Error cargando productos:",t),this.listElement.innerHTML="<p>Error loading products</p>"}}renderList(t){const a=t.map(e=>s(e)).join("");this.listElement.innerHTML=a}}export{n as P};
