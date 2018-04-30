import { assert } from 'chai';
import solution from '../challenges/c3-number-to-words/solution';

describe('number-to-words', () => {
  it('can convert', () => {
    assert.strictEqual(solution(2), 'two');
    assert.strictEqual(solution(301), 'three hundred one');
    assert.strictEqual(solution(1986), 'one thousand nine hundred eighty six');
    assert.strictEqual(solution(2743), 'two thousand seven hundred forty three');
    assert.strictEqual(solution(12341), 'twelve thousand three hundred forty one');
    // tslint:disable-next-line:max-line-length
    assert.strictEqual(solution(1290489), 'one million two hundred ninety thousand four hundred eighty nine');
  });
});
