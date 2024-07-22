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

  test('url', async () => {
    const client = create();
    const { send } = client.get('http://localhost:5173/api/test');
  });
});
