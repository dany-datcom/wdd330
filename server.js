import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Rutas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'cart', 'index.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'checkout', 'index.html'));
});

app.get('/product_pages', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'product_pages', 'index.html'));
});

// CORREGIDO: Para productos individuales
app.get('/product_pages/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'product_pages', 'index.html'));
});

// Si necesitas capturar múltiples niveles:
app.get('/product_pages/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'product_pages', 'index.html'));
});

// Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});