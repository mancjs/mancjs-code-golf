import solution from '../challenges/c5-add/solution';

describe('add solution', () => {
  test('adds correctly', () => {
    expect(solution([3, 4])).toBe(7);
    expect(solution([12345, 54321])).toBe(66666);
  });
});
