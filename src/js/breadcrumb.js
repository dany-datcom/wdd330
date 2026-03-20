export function renderBreadcrumb({ category, count = null }) {
  const breadcrumb = document.getElementById('breadcrumb');

  if (!breadcrumb || !category) return;

  function formatCategory(cat) {
    return cat
      .replace('-', ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  // Si hay count → listing
  if (count !== null) {
    breadcrumb.innerHTML = `
      <span>${formatCategory(category)}</span> -> (${count} items)
    `;
  } else {
    // Detalle de producto
    breadcrumb.innerHTML = `
      <span>${formatCategory(category)}</span>
    `;
  }
}