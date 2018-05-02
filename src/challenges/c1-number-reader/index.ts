import { Challenge } from '..';
import solution from './solution';

const input = 77209536;

const challenge: Challenge = {
  input,
  title: 'Number Reader',
  output: solution(input),
  // tslint:disable-next-line:max-line-length
  description: `
Write a program that takes a number and converts it to the equivalant string, i.e.
12341 -> "one two three four one"
  `.trim(),
};

export = challenge;
