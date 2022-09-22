import type { Challenge } from '..';
import solution from './solution';

const input = [
  [1, 2, 3, 4, 5],
  ['unu', 'du', 'tri', 'kvar', 'kvin'],
  ['v', 'w', 'x', 'y', 'z'],
];

const challenge: Challenge = {
  input,
  title: 'Array Flatten',
  output: solution(input),
  description: `Write a function that takes an array of three other arrays and returns a single, flattened array. The second array's values should remain in the middle, but the first and third should be swapped.`,
  example: `[[4, 5, 6], ["a", "b", "c"], [1, 2, 3]] ⟶ [1, 2, 3, "a", "b", "c", 4, 5, 6]`,
};

export = challenge;
