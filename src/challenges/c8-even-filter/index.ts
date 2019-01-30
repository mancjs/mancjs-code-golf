import { Challenge } from '..';
import solution from './solution';

function generateRandomNumberArray(): number[] {
    return Array.from({ length:40 }, () => Math.floor(Math.random() * 40))
}

const input = generateRandomNumberArray();

const challenge: Challenge = {
    input,
    title: 'Even Number Filter',
    output: solution(input),
    description: 'Write a function which returns an array of numbers containing only even numbers.'.trim(),
};

export = challenge;