import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',
  base: './',

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        productListing: resolve(__dirname, 'src/product_listing/index.html'),
      },
    },
  },

  server: {
    host: true, // hace que escuche en 0.0.0.0
    port: Number(process.env.PORT) || 5173, // usa el puerto que Render asigna
    allowedHosts: [
      'sleepoutside-ql6z.onrender.com',
      '.onrender.com', // permite todos los subdominios de Render
      'localhost'
    ]
  },

  preview: {
    host: true,
    port: Number(process.env.PORT) || 5173,
    allowedHosts: [
      'sleepoutside-ql6z.onrender.com',
      '.onrender.com',
      'localhost'
    ]
  }
});