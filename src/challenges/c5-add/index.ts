import { Challenge } from '..';
import solution from './solution';

const input: [number, number] = [64722, 87549];

const challenge: Challenge = {
  input,
  title: 'Add',
  output: solution(input),
  // tslint:disable-next-line:max-line-length
  description: `
Write an implementation of an add function without using the plus operator.
The function will be called with an array of two numbers and should result the sum.
`.trim(),
  rules: ['no-add', 'no-eval'],
};

export = challenge;
