import { describe, expect, test } from 'vitest';
import { create } from '@lib/index';

describe('browser http', async () => {
  test('timeout', async () => {
    const client = create();
    const { send } = client.get('http://localhost:5173/api/test', {
      timeout: 1,
    });
    const { error } = await send();
    expect(error!.message).toBe('request timeout');
  });

  test('query', async () => {
    const client = create();
    const { response: res1 } = await client
      .get('http://localhost:5173/api/test', {
        query: { a: 1 },
      })
      .send();

    expect(res1).toBeDefined();
    expect(res1?.url).toBe('http://localhost:5173/api/test?a=1');

    const { response: res2 } = await client
      .get('/api/test', {
        query: { a: 1 },
      })
      .send();
    expect(res2?.url?.split('?')?.[1]).toBe('a=1');

    const { response: res3 } = await client
      .get('/api/test', {
        query: new URLSearchParams({ a: '1' }),
      })
      .send();
    expect(res3?.url?.split('?')?.[1]).toBe('a=1');
  });
});
