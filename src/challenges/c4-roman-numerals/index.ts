import { Challenge } from '..';
import solution from './solution';

const input = 2476;

const challenge: Challenge = {
  input,
  title: 'Roman Numerals',
  output: solution(input),
  description: `Write a function that converts numbers to roman numerals.`,
  example: `23 ⟶ "XXIII", 2743 ⟶ "MMDCCXLIII"`,
};

export = challenge;
