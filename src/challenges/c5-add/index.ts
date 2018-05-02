import { Challenge } from '..';
import solution from './solution';

const input: [number, number] = [64722, 87549];

const challenge: Challenge = {
  input,
  title: 'Add',
  output: solution(input),
  description: `
Write an implementation of an add function without using the plus operator.
The function will be called with an array of two numbers and should return the sum. i.e.
[3, 4] -> 7
`.trim(),
  rules: ['no-add', 'no-eval'],
};

export = challenge;
