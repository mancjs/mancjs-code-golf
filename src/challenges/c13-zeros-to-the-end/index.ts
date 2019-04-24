import { Challenge } from '..';
import solution from './solution';

function generateRandomNumberArray(): number[] {
    return Array.from({ length:40 }, () => Math.floor(Math.random() * 40))
}

const input = generateRandomNumberArray()

const challenge: Challenge = {
    input,
    title: 'Zeros to the end',
    output: solution(input),
    description: `
        Write a method that moves all zeros in an array to its end
        
        [1, 0, 2, 0, 4, 0] => [1, 2, 4, 0, 0, 0]
    `.trim(),
};

export = challenge;