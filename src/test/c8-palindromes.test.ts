import solution from '../challenges/c8-palindromes/solution';

describe('palindromes solution', () => {
  test('detects none', () => {
    expect(solution(['tim', 'john'])).toBe(0);
  });

  test('detects one', () => {
    expect(solution(['tim', 'anna'])).toBe(1);
  });

  test('detects many', () => {
    expect(solution(['tim', 'anna', 'john', 'madam', 'abba'])).toBe(3);
  });

  test('detects all', () => {
    expect(solution(['anna', 'murdrum', 'mim', 'nun', 'noon'])).toBe(5);
  });
});
