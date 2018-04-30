import { assert } from 'chai';
import solution from '../challenges/c5-add/solution';

describe('add', () => {
  it('can add', () => {
    assert.strictEqual(solution([3, 4]), 7);
    assert.strictEqual(solution([12345, 54321]), 66666);
  });
});
