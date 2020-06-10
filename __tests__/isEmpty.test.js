import { isEmpty } from '../lib/functions';

describe('isEmpty function', () => {
  it('works with strings', () => {
    expect(isEmpty('')).toEqual(true);
    expect(isEmpty('abc')).toEqual(false);
  });

  it('works with arrays', () => {
    expect(isEmpty([])).toEqual(true);
    expect(isEmpty([1, 2, 3])).toEqual(false);
    expect(isEmpty([{ name: 'Joe' }, { name: 'Jane' }])).toEqual(false);
  });

  it('works with objects', () => {
    expect(isEmpty({})).toEqual(true);
    expect(isEmpty({ name: 'Joe' })).toEqual(false);
  });

  it('works with undefined', () => {
    expect(isEmpty(undefined)).toEqual(true);
  });

  it('works with null', () => {
    expect(isEmpty(null)).toEqual(true);
  });
});
