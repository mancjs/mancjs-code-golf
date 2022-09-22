import { Challenge } from '..';
import solution from './solution';

const input = [10, 1, 150, 34, 300, 250, 12, 22, 23, 65, 33, 16, 1, 2];

const challenge: Challenge = {
  input,
  title: 'Sort The Numbers',
  output: solution(input),
  description:
    'Write a function that takes an array of numbers and returns a sorted array in ascending order.',
  example: `[3, 5, 2, 4, 1] ⟶ [1, 2, 3, 4, 5]`,
  rules: ['no-sort'],
};

export = challenge;
