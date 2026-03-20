function productCardTemplate(product) {
    const brand = product.Brand?.Name || 'Unknown';

    return `<li class='product-card'>
    <a href='/product_pages/index.html?product=${product.Id}&category=${product.Category}'>
      <img src='${product.Images?.PrimaryMedium}' alt='Image of ${product.Name}'>
      <h2 class='card__brand'>${brand}</h2>
      <h3 class='card__name'>${product.Name}</h3>
      <p class='product-card__price'>$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        this.listElement.innerHTML = '<p>Loading...</p>';

        try {
            const list = await this.dataSource.getData(this.category);

            if (!list || list.length === 0) {
                this.listElement.innerHTML = '<p>No products found</p>';
                return;
            }

            this.renderList(list);
        } catch (error) {
            console.error('Error cargando productos:', error);
            this.listElement.innerHTML = '<p>Error loading products</p>';
        }
    }

    renderList(productList) {
        const html = productList
            .map(product => productCardTemplate(product))
            .join('');

        this.listElement.innerHTML = html;
    }
}