import solution from '../challenges/c1-number-reader/solution';

describe('number reader solution', () => {
  test('one digit', () => {
    expect(solution(1)).toBe('one');
  });

  test('two digits', () => {
    expect(solution(12)).toBe('one two');
  });

  test('three digits', () => {
    expect(solution(123)).toBe('one two three');
  });

  test('four digits', () => {
    expect(solution(1234)).toBe('one two three four');
    expect(solution(4321)).toBe('four three two one');
  });

  test('five digits', () => {
    expect(solution(12345)).toBe('one two three four five');
    expect(solution(24351)).toBe('two four three five one');
  });

  test('all digits', () => {
    expect(solution(9087651234)).toBe(
      'nine zero eight seven six five one two three four'
    );
  });
});
