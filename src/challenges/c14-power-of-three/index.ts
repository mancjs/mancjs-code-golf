import { Challenge } from '..';
import solution from './solution';

function generateRandomNumber(): number {
    return Math.floor(Math.random() * 40);
}

const input = generateRandomNumber()

const challenge: Challenge = {
    input,
    title: 'Power of three',
    output: solution(input),
    description: `
        Given an integer num, write a method to determine if it is a power of 3.
        
        9 => true
    `.trim(),
};

export = challenge;