import { alertMessage } from './utils.mjs';
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
    this.tax = this.itemTotal * 0.06;

    const totalItems = this.list.reduce(
      (sum, item) => sum + item.Quantity,
      0
    );

    this.shipping =
      totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

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
    return items.map((item) => ({
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

    const order = {
      ...data,
      orderDate: new Date().toISOString(),
      items: this.packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    const service = new ExternalServices();

    // 🔥 AQUÍ está lo que te están pidiendo
    try {
      const result = await service.checkout(order);

      // manejo del éxito
      if (result && result.orderId) {
        localStorage.removeItem(this.key);
        window.location.href = '/checkout/success.html';
      }

    } catch (err) {
      // 🔥 AQUÍ manejas el error
      let message = 'Something went wrong';

      if (err && err.message) {
        if (typeof err.message === 'object') {
          message = Object.values(err.message).join(', ');
        } else {
          message = err.message;
        }
      }

      alertMessage(message);
    }
  }
}