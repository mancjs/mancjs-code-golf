import type { Challenge } from '..';
import solution from './solution';

const input = 877209536;

const challenge: Challenge = {
  input,
  title: 'Number Reader',
  output: solution(input),
  description: `Write a function that takes a number and converts it to the equivalant string.`,
  example: `12341 ⟶ "one two three four one"`,
};

export = challenge;
