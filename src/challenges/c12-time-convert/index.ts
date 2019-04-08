import { Challenge } from '..';
import solution from './solution';

function generateRandomNumberArray(): number[] {
    return Array.from({ length:40 }, () => Math.floor(Math.random() * 40))
}

const input = 123

const challenge: Challenge = {
    input,
    title: 'Time Convert',
    output: solution(input),
    description: `
        Write a function which takes in a number and converts it into the time by hours and minutes
        
        example: 12 => 0:12 & 63 => 1:3
    `.trim(),
};

export = challenge;