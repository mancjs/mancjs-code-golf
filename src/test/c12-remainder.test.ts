import solution from '../challenges/c12-remainder/solution';

describe('remainder solution', () => {
  test('computes correct remainders', () => {
    expect(solution([10, 5])).toEqual(0);
    expect(solution([5, 10])).toEqual(5);
    expect(solution([7, 3])).toEqual(1);
    expect(solution([100, 23])).toEqual(8);
    expect(solution([7362, 392])).toEqual(306);
  });
});
