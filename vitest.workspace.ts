import { defineWorkspace } from 'vitest/config';
import { resolve } from 'node:path';

const fixtures = resolve(__dirname, './fixtures');

export default defineWorkspace([
  {
    test: {
      alias: {
        '@fixtures': fixtures,
        '@lib': resolve(__dirname, './lib'),
      },
      include: ['./tests/unit/**/*.test.ts'],
      name: 'unit',
      environment: 'node',
    },
  },
  {
    server: {
      port: 5174,
    },
    test: {
      // an example of file based convention,
      // you don't have to follow it
      alias: {
        '@fixtures': fixtures,
        '@lib': resolve(__dirname, './lib'),
      },
      include: ['./tests/browser/**/*.test.ts'],
      name: 'browser',
      browser: {
        ui: true,
        provider: 'preview',
        enabled: true,
        name: 'chrome',
      },
    },
  },
]);
