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
  if (typeof callback === 'function') callback(data);
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

    renderWithTemplate(headerTemplate, qs('#main-header'));
    renderWithTemplate(footerTemplate, qs('#main-footer'));
  } catch (error) {
    console.error('Error cargando header/footer:', error);
  }
}

// 🔥 ALERTA MEJORADA
export function alertMessage(message, scroll = true) {
  // eliminar alert anterior si existe
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) existingAlert.remove();

  // crear contenedor
  const alert = document.createElement('div');
  alert.classList.add('alert');

  // contenido del alert
  alert.innerHTML = `
    <span>${message}</span>
    <button class='close-btn'>✖</button>
  `;

  // cerrar alert al hacer click en la X
  alert.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-btn')) {
      this.remove();
    }
  });

  // agregar al inicio del main
  const main = document.querySelector('main');
  if (main) {
    main.prepend(alert);
  }

  // scroll opcional hacia arriba
  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}