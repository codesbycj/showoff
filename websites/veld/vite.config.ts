import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // strictPort because Vite's default is to walk up to the next free port and
  // say so in a line of output nobody reads — which means every screenshot
  // tool, bookmark and note pointing at :5184 silently lands on whatever else
  // is running there. Failing to start is the better error.
  server: { port: 5184, strictPort: true, open: false },
});
