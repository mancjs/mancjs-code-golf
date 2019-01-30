import { Challenge } from '..';
import solution from './solution';

function generateRandomNumberArray(): number[] {
    return Array.from({ length:40 }, () => Math.floor(Math.random() * 40))
}

const input = generateRandomNumberArray();

const challenge: Challenge = {
    input,
    title: 'Largest Number',
    output: solution(input),
    description: 'Write a function which returns the largest number out of an array'.trim(),
};

export = challenge;