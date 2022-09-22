import { Challenge } from '..';
import solution from './solution';

const input = [
  'lemel',
  'level',
  'john',
  'maam',
  'madam',
  'mem',
  'mesem',
  'tim',
  'mim',
  'minim',
  'mum',
  'murdrum',
  'nan',
  'language',
  'non',
  'noon',
  'pasta',
  'nun',
  'tea',
];

const challenge: Challenge = {
  input,
  title: 'Palindromes',
  output: solution(input),
  description: `Write a function to count how many words in an array are palindromes. The function will be called with an array of words and should return the number of palindromes found.`,
  example: `["abba", "hello", "high", "bob"] ⟶ 2`,
};

export = challenge;
