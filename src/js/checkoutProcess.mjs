import ExternalServices from './ExternalServices.mjs';
export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = JSON.parse(localStorage.getItem(this.key)) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * item.Quantity,
      0
    );

    document.querySelector('#subtotal').innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // TAX 6%
    this.tax = this.itemTotal * 0.06;

    // SHIPPING
    this.shipping = this.list.length > 0
      ? 10 + (this.list.length - 1) * 2
      : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector('#tax').innerText =
      `$${this.tax.toFixed(2)}`;

    document.querySelector('#shipping').innerText =
      `$${this.shipping.toFixed(2)}`;

    document.querySelector('#total').innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id || item.id,
      name: item.Name || item.name,
      price: item.FinalPrice || item.price,
      quantity: item.Quantity || item.quantity
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // NORMALIZAR EXPIRATION COMPLETO
    let expiration = data.expiration.trim();

    // convertir formatos tipo 2027-08 → 8/27
    if (expiration.includes('-')) {
      const [year, month] = expiration.split('-');
      expiration = `${parseInt(month)}/${year.slice(-2)}`;
    }

    // quitar 0 inicial (08 → 8)
    expiration = expiration.replace(/^0/, '');

    // validar formato final M/YY
    const regex = /^[1-9]|1[0-2]\/\d{2}$/;

    if (!/^(1[0-2]|[1-9])\/\d{2}$/.test(expiration)) {
      console.log('Formato inválido:', expiration);
    }

    data.expiration = expiration;
    const order = {
      ...data,
      orderDate: new Date().toISOString(),
      items: this.packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    const service = new ExternalServices();

    const result = await service.checkout(order);

    console.log('Respuesta del servidor:', result);

    if (result.orderId) {
      localStorage.removeItem(this.key);
      window.location.href = '/';
    }
  }
}