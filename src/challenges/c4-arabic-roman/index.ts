import { Challenge } from '..';
import solution from './solution';

const input = 2476;

const challenge: Challenge = {
  input,
  title: 'Arabic to Roman',
  output: solution(input),
  // tslint:disable-next-line:max-line-length
  description: `
Make a function that takes in arabic numbers and gives you roman ones, i.e.
23    => "XXIII"
2743  => "MMDCCXLIII"
  `.trim(),
};

export = challenge;
