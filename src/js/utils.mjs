export function qs(selector, parent = document) {
  const el = parent.querySelector(selector);
  if (!el) console.warn(`No se encontró: ${selector}`);
  return el;
}

export function getLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error leyendo localStorage:', error);
    return null;
  }
}

export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
  }
}

export function setClick(selector, callback) {
  const element = qs(selector);

  if (!element) return;

  element.addEventListener('touchend', (event) => {
    event.preventDefault();
    callback(event);
  });

  element.addEventListener('click', callback);
}

export function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return;

  parentElement.innerHTML = template;

  if (typeof callback === 'function') {
    callback(data);
  }
}

export async function loadTemplate(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Error cargando template');
    return await res.text();
  } catch (error) {
    console.error(`Error cargando ${path}:`, error);
    return '';
  }
}

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');

    const headerElement = qs('#main-header');
    const footerElement = qs('#main-footer');

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  } catch (error) {
    console.error('Error cargando header/footer:', error);
  }
}

// 👇 AFUERA, no dentro
export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');

  alert.innerHTML = `
    <span>${message}</span>
    <button class='close-btn'>X</button>
  `;

  alert.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-btn')) {
      alert.remove();
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}