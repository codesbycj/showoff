import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // strictPort, so starting this while it is already up fails loudly instead of
  // sliding to the next free port and leaving every capture pointed elsewhere.
  server: { port: 5204, strictPort: true, open: false },
});
