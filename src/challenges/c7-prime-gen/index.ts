import { Challenge } from '..';
import solution from './solution';

const input = 10000;

const challenge: Challenge = {
  input,
  title: 'Prime Number Generator',
  output: solution(input),
  description: `
Write a function which returns an array of primes starting from 2.
The function will passed a number for the maximum number of primes to return.
`.trim(),
};

export = challenge;
