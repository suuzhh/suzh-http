import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import mockDevServerPlugin from 'vite-plugin-mock-dev-server';

const libPath = resolve(__dirname, 'lib');

export default defineConfig({
  resolve: {
    alias: {
      '@lib': libPath,
    },
  },
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'suzh-http',
      fileName: 'suzh-http',
    },
  },

  server: {
    proxy: {
      '^/api': 'http://example.com/',
    },
  },
  plugins: [mockDevServerPlugin()],
});
