import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

const fixtures = resolve(__dirname, './fixtures');

export default defineConfig({
  test: {
    alias: {
      '@fixtures': fixtures,
    },
  },
});
