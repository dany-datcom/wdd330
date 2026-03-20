import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde dist
app.use(express.static(path.join(__dirname, 'dist')));

// Para todas las rutas, servir el index.html correspondiente
app.get('*', (req, res) => {
  // Si la ruta es /cart/ o /cart, servir cart/index.html
  if (req.path.startsWith('/cart')) {
    res.sendFile(path.join(__dirname, 'dist', 'cart', 'index.html'));
  } 
  // Si la ruta es /checkout/
  else if (req.path.startsWith('/checkout')) {
    res.sendFile(path.join(__dirname, 'dist', 'checkout', 'index.html'));
  }
  // Si la ruta es /product_pages/
  else if (req.path.startsWith('/product_pages')) {
    res.sendFile(path.join(__dirname, 'dist', 'product_pages', 'index.html'));
  }
  // Si la ruta es /product_listing/
  else if (req.path.startsWith('/product_listing')) {
    res.sendFile(path.join(__dirname, 'dist', 'product_listing', 'index.html'));
  }
  // Para cualquier otra ruta, servir index.html principal
  else {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});