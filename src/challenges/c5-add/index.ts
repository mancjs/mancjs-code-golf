import { Challenge } from '..';
import solution from './solution';

const input: [number, number] = [64722, 87549];

const challenge: Challenge = {
  input,
  title: 'Add',
  output: solution(input),
  description:
    'Write a function to add two numbers without using the plus operator. The function will be called with an array of two numbers and should return the sum.',
  example: `[3, 4] ⟶ 7, [100, 200] ⟶ 300`,
  rules: ['no-add', 'no-eval'],
};

export = challenge;
