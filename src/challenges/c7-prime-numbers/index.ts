import { Challenge } from '..';
import solution from './solution';

const input = 10000;

const challenge: Challenge = {
  input,
  title: 'Prime Numbers',
  output: solution(input),
  description:
    'Write a function to return an array of prime numbers in numerical order starting from 2. The function will be passed a max number that all generated primes must be below (not equal to).',
  example: `5 ⟶ [2, 3], 12 ⟶ [2, 3, 5, 7, 11]`,
};

export = challenge;
