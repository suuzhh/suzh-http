import { defineMock } from 'vite-plugin-mock-dev-server';

export default defineMock([
  {
    url: '/api/test',
    body: {
      a: 1,
      b: 2,
    },
  },
  {
    url: '/api/test/2',
    body: {
      a: 33,
      b: 44,
    },
  },
]);
