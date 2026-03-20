import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Para todas las rutas, servir el archivo HTML correspondiente
app.get('*', (req, res) => {
  // Determinar qué archivo servir basado en la ruta
  let filePath = path.join(__dirname, 'dist', 'index.html');
  
  if (req.path.startsWith('/cart')) {
    filePath = path.join(__dirname, 'dist', 'cart', 'index.html');
  } else if (req.path.startsWith('/checkout')) {
    filePath = path.join(__dirname, 'dist', 'checkout', 'index.html');
  } else if (req.path.startsWith('/product_pages')) {
    filePath = path.join(__dirname, 'dist', 'product_pages', 'index.html');
  } else if (req.path.startsWith('/product_listing')) {
    filePath = path.join(__dirname, 'dist', 'product_listing', 'index.html');
  }
  
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});