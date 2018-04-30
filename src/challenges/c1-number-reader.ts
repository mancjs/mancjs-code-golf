import { Challenge } from '.';

const solution = (n: number) => {
  const a = [];
  const ns = n + '';
  for (let i = 0; i < ns.length; i += 1) {
    a.push(['zero', 0, 'two', 'three', 0, 'five', 'six', 'seven', 0, 'nine'][parseInt(ns[i], 10)]);
  }
  return a.join(' ');
};

const input = 77209536;

const challenge: Challenge = {
  input,
  title: 'Number Reader',
  output: solution(input),
  // tslint:disable-next-line:max-line-length
  description: 'Write a program that takes a number and converts it to the equivalant string, i.e. 12341 -> "one two three four one"',
};

export = challenge;
