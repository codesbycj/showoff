import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // strictPort: starting this while it is already up fails loudly instead of
  // moving to the next free port and leaving every capture tool on the wrong app.
  server: { port: 5364, strictPort: true, open: false },
});
