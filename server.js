// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos de Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all para SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
