import solution from '../challenges/c3-number-to-words/solution';

describe('number to words solution', () => {
  test('one digit', () => {
    expect(solution(2)).toBe('two');
  });

  test('two digits', () => {
    expect(solution(15)).toBe('fifteen');
  });

  test('three digits', () => {
    expect(solution(301)).toBe('three hundred one');
  });

  test('four digits', () => {
    expect(solution(1986)).toBe('one thousand nine hundred eighty six');
    expect(solution(2743)).toBe('two thousand seven hundred forty three');
  });

  test('five digits', () => {
    expect(solution(12341)).toBe('twelve thousand three hundred forty one');
  });

  test('eight digits', () => {
    expect(solution(1290489)).toBe(
      'one million two hundred ninety thousand four hundred eighty nine'
    );
  });
});
