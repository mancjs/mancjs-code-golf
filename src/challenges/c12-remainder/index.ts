import type { Challenge } from '..';
import solution from './solution';

const input = [7362, 392];

const challenge: Challenge = {
  input,
  title: 'Remainder',
  output: solution(input),
  description: `Write a function that takes an array of two numbers – the first the dividend, the second the divisor – and returns the remainder.`,
  example: `[10, 2] ⟶ 0, [25, 4] ⟶ 1, [12, 7] ⟶ 5`,
};

export = challenge;
