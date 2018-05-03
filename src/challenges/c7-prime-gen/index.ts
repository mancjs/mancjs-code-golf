import { Challenge } from '..';
import solution from './solution';

const input = 10000;

const challenge: Challenge = {
  input,
  title: 'Prime Number Generator',
  output: solution(input),
  description: `
Write a function which returns an array of primes in numerical order starting from 2.
The function will be passed the max for which the primes must be less than (not equal).
`.trim(),
};

export = challenge;
