import { Challenge } from '..';
import solution from './solution';

const input = 743243892;

const challenge: Challenge = {
  input,
  title: 'Number To Words',
  output: solution(input),
  // tslint:disable-next-line:max-line-length
  description: `
Write a program that takes a number and converts it to spoken words, i.e.
2       -> "two"
301     -> "three hundred one"
12341   -> "twelve thousand three hundred forty one"
1290489 -> "one million two hundred ninety thousand four hundred eighty nine"
  `.trim(),
};

export = challenge;
