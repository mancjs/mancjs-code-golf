import { assert } from 'chai';
import solution from '../challenges/c4-arabic-roman/solution';

describe('arabic-roman', () => {
  it('can convert', () => {
    assert.strictEqual(solution(1986), 'MCMLXXXVI');
    assert.strictEqual(solution(2476), 'MMCDLXXVI');
    assert.strictEqual(solution(2743), 'MMDCCXLIII');
  });
});
