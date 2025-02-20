import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({

  server: {
    port: 3000, 
  },
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        explore: resolve(__dirname, 'src/explore/explore.html'),

      },
    },
  },
});