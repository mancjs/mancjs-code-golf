import { Challenge } from '..';
import solution from './solution';


const input = "imateststring";

const challenge: Challenge = {
    input,
    title: 'Alphabet Soup',
    output: solution(input),
    description: `
        Write a function which takes a string and returns the string with the letters placed in alphabetical order
    `.trim(),
};

export = challenge;