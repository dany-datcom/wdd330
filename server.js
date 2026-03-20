// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Configuración para __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos de Vite build
app.use(express.static(path.join(__dirname, "dist")));

// Capturar todas las rutas y devolver index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});