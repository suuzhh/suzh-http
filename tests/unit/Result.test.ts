import { describe, expect, test } from 'vitest';
import { err, ok, result } from '@lib/result/index';

describe('Result', () => {
  test('helper:result', () => {
    expect(result(1)).toEqual(ok(1));
    expect(result(1, (v) => v === 1)).toEqual(ok(1));

    // result 默认只识别Error对象为Err类型
    const er = new Error('error');
    expect(result(er)).toEqual(err(er));
  });

  test('is_ok', () => {
    expect(ok(1).is_ok).toBeTruthy();
    expect(err(new Error('error')).is_ok).toBeFalsy();
  });

  test('map_or', () => {
    expect(ok(1).map_or(2, (v) => v + 1)).toBe(2);
    expect(err(new Error('error')).map_or(2, (v) => v + 1)).toBe(2);
    expect(ok(3).map_or(2, (v) => v + 1)).toBe(4);
  });
});
