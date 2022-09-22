import solution from '../challenges/c10-array-flatten/solution';

describe('array flatten rearrange solution', () => {
  test('flattens and rearranges single values', () => {
    expect(solution([[1], ['a'], [2]])).toEqual([2, 'a', 1]);
    expect(solution([['c'], ['b'], ['a']])).toEqual(['a', 'b', 'c']);
  });

  test('flattens and rearranges multiple values', () => {
    expect(
      solution([
        [4, 5, 6],
        ['a', 'b', 'c'],
        [1, 2, 3],
      ])
    ).toEqual([1, 2, 3, 'a', 'b', 'c', 4, 5, 6]);
    expect(
      solution([
        [9, 10, 11, 12],
        [5, 6, 7, 8],
        [1, 2, 3, 4],
      ])
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
});
