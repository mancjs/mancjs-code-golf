import { Challenge } from '..';
import solution from './solution';

const input = [
  10,
  1,
  150,
  34,
  300,
  250,
  12,
  22,
  23,
  65,
  33,
  16,
  1,
  2,
];

const challenge: Challenge = {
  input,
  title: 'Sort The Numbers',
  output: solution(input),
  // tslint:disable-next-line:max-line-length
  description: 'Sort the array of numbers passed to your play function in ascending order, returning a sorted array.',
  rules: ['no-sort'],
};

export = challenge;
