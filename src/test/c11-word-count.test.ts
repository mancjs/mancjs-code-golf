import solution from '../challenges/c11-word-count/solution';

describe('word count solution', () => {
  test('counts single word', () => {
    expect(solution('one')).toEqual(1);
  });

  test('counts multiple words', () => {
    expect(solution('one two three')).toEqual(3);
  });

  test('ignores grammar', () => {
    expect(solution('one! two? three. four.')).toEqual(4);
  });

  test('ignore multiple spaces', () => {
    expect(solution('hello        world     ')).toEqual(2);
  });

  test('ignore grammar on its own', () => {
    expect(solution(' hello , world . ')).toEqual(2);
  });
});
