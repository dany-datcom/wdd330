import{r}from"./utils-B2y0dHph.js";import{P as i}from"./ProductData-ckpWzqDt.js";function c(t){return`<li class='product-card'>
    <a href='product_pages/?product=${t.Id}'>
      <img src='${t.Image}' alt='Image of ${t.Name}'>
      <h2 class='card__brand'>${t.Brand.Name}</h2>
      <h3 class='card__name'>${t.Name}</h3>
      <p class='product-card__price'>$${t.FinalPrice}</p>
    </a>
  </li>`}class n{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s}async init(){const e=await this.dataSource.getData();console.log(e),this.renderList(e)}renderList(e){r(c,this.listElement,e,"afterbegin",!0)}}const o=new i("tents"),l=document.querySelector(".product-list"),d=new n("tents",o,l);d.init();
