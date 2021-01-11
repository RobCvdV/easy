import { Dev } from '../ref';
import { ifGet, list } from '../../src';

describe('ifGet', () => {

  const empty = list();
  const filled = list(Dev.Naoufal);

  test('ifGet invalid', () => {
    expect(ifGet(undefined, 'Yes', 'No')).toBe('No');
    expect(ifGet(null, 'Yes', 'No')).toBe('No');
    expect(ifGet(0, 'Yes', 'No')).toBe('No');
    expect(ifGet('', 'Yes', 'No')).toBe('No');
    expect(ifGet(false, 'Yes', 'No')).toBe('No');
    expect(ifGet(empty.length, 'Yes', 'No')).toBe('No');
    expect(ifGet(() => 0, 'Yes', 'No')).toBe('No');
  });

  test('ifGet valid', () => {
    expect(ifGet(1, 'Yes', 'No')).toBe('Yes');
    expect(ifGet({}, 'Yes', 'No')).toBe('Yes');
    expect(ifGet('1', 'Yes', 'No')).toBe('Yes');
    expect(ifGet(true, 'Yes', 'No')).toBe('Yes');
    expect(ifGet(filled.length, 'Yes', 'No')).toBe('Yes');
    expect(ifGet(() => 1, 'Yes', 'No')).toBe('Yes');
  });
});
