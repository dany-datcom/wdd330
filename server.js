// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde dist
app.use(express.static(path.join(__dirname, 'dist')));

// IMPORTANTE: No hacer catch-all que siempre sirva index.html
// porque tienes múltiples páginas HTML
// En lugar de eso, confía en que las rutas a los HTML específicos funcionen
// y solo usa catch-all como fallback para SPA-like routing

// Para rutas que deberían ser HTML específicos
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'cart', 'index.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'checkout', 'index.html'));
});

app.get('/product_pages', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'product_pages', 'index.html'));
});

// Para todo lo demás (como productos individuales /product/123)
app.get('/product/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'product_pages', 'index.html'));
});

// Para la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Fallback para cualquier otra ruta (opcional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});