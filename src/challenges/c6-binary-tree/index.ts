import { Challenge } from '..';
import solution from './solution';

interface Node {
  a?: Node;
  b?: Node;
}

// tslint:disable-next-line:max-line-length
const input: Node = { a: { a: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } } }, b: {} }, b: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: { a: {}, b: {} } }, b: {} } } }, b: { a: {}, b: {} } } }, b: { a: {}, b: { a: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: { a: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } } }, b: {} }, b: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: { a: {}, b: {} } }, b: {} } } }, b: { a: {}, b: {} } } }, b: { a: {}, b: { a: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: { a: {}, b: {} } } } } } }, b: { a: {}, b: {} } } } } } } } } } }, b: { a: {}, b: {} } } } };

const challenge: Challenge = {
  input,
  title: 'Binary Tree',
  output: solution(input),
  description: `
Given a binary tree where each node is a plain JavaScript object.
Each object can optionally contain properties 'a' and 'b' pointing to child nodes. 
Count the total number of NODES in the tree.
{}                              => 1
{ a: {} }                       => 2
{ a: {}, b: { a: {}, b: {} } }  => 5
`.trim(),
};

export = challenge;
