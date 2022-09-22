import { Challenge } from '..';
import solution from './solution';

const input = 743243892;

const challenge: Challenge = {
  input,
  title: 'Number To Words',
  output: solution(input),
  description: `Write a function that takes a number and converts it to words.`,
  example: `2 ⟶ "two", 301 ⟶ "three hundred one", 12341 ⟶ "twelve thousand three hundred forty one", 1290489 ⟶ "one million two hundred ninety thousand four hundred eighty nine"`,
};

export = challenge;
