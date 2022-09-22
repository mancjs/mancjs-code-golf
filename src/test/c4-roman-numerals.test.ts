import solution from '../challenges/c4-roman-numerals/solution';

describe('roman numerals solution', () => {
  test('converts correctly', () => {
    expect(solution(1986)).toBe('MCMLXXXVI');
    expect(solution(2476)).toBe('MMCDLXXVI');
    expect(solution(2743)).toBe('MMDCCXLIII');
    expect(solution(88)).toBe('LXXXVIII');
    expect(solution(98)).toBe('XCVIII');
  });
});
