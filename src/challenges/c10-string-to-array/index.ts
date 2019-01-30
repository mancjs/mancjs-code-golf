import { Challenge } from '..';
import solution from './solution';

function generateRandomNumberArray(): number[] {
    return Array.from({ length:40 }, () => Math.floor(Math.random() * 40))
}

const input = generateRandomNumberArray().join(' ');

const challenge: Challenge = {
    input,
    title: 'Number list: string to array',
    output: solution(input),
    description: `
        Write a function which takes a list of numbers from a space seperated string
        example: "1 2 3" => [1,2,3]
    `.trim(),
};

export = challenge;