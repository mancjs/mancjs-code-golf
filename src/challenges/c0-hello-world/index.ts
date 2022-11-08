import { Challenge } from '..';
import solution from './solution';

const challenge: Challenge = {
  input: '',
  title: 'Hello world',
  output: solution(),
  // tslint:disable-next-line:max-line-length
  description: "Return the string 'Hello world!'".trim(),
};

export = challenge;
