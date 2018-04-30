import { assert } from 'chai';
import solution from '../challenges/c6-binary-tree/solution';

describe('binary tree', () => {
  it('can count', () => {
    assert.strictEqual(solution({}), 1);
    assert.strictEqual(solution({ a: {}, b: { a: {}, b: {} } }), 5);
    assert.strictEqual(solution({ a: {}, b: { a: {}, b: {}, c: {} } }), 5);
    // tslint:disable-next-line:max-line-length
    assert.strictEqual(solution({ a: { a: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } } }, b: {} }, b: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: { a: {}, b: {} } }, b: {} } } }, b: { a: {}, b: {} } } }, b: { a: {}, b: { a: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: { a: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } } }, b: {} }, b: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: { a: {}, b: {} } }, b: {} } } }, b: { a: {}, b: {} } } }, b: { a: {}, b: { a: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: {} } } } } } }, b: { a: {}, b: {} } } } } } } } } } }, b: { a: {}, b: {} } } } }), 93);
  });
});
