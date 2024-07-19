import { describe, expect, test } from 'vitest';
import { result } from './index';

describe('Result', () => {
  test('is_ok', () => {
    expect(result(1).is_ok()).toBeTruthy();
    expect(result(new Error('error')).is_ok()).toBeFalsy();
  });

  test('map_or', () => {
    expect(result(1).map_or(2, (v) => v + 1)).toBe(2);
    expect(result(new Error('error')).map_or(2, (v) => v + 1)).toBe(2);
    expect(result(3).map_or(2, (v) => v + 1)).toBe(4);
  });
});
