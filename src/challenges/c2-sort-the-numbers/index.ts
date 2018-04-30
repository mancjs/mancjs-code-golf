import { Challenge } from '..';

const solution = (n: number[]) => {
  const a = [];
  const b = [];
  for (let i = 0; i < n.length; i += 1) {
    a[n[i]] ? a[n[i] + 1] = n[i] : a[n[i]] = n[i];
  }
  for (let x = 0; x < a.length; x += 1) {
    if (a[x]) b.push(a[x]);
  }
  return b;
};

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
