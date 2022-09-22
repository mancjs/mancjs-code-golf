import solution from '../challenges/c2-sort-the-numbers/solution';

describe('sort the numbers solution', () => {
  test('three numbers', () => {
    expect(solution([3, 2, 1])).toEqual([1, 2, 3]);
  });

  test('five numbers', () => {
    expect(solution([3, 5, 2, 4, 1])).toEqual([1, 2, 3, 4, 5]);
    expect(solution([5, 2, 10, 20, 9])).toEqual([2, 5, 9, 10, 20]);
  });

  test('already sorted', () => {
    expect(solution([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test('ten numbers', () => {
    expect(solution([10, 500, 10000, 35, 2, 15, 50, 75, 7500, 499])).toEqual([
      2, 10, 15, 35, 50, 75, 499, 500, 7500, 10000,
    ]);
  });
});
