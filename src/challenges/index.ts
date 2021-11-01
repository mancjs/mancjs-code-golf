import c1NumberReader = require("./c1-number-reader");
import c2SortTheNumbers = require("./c2-sort-the-numbers");
import c3NumberToWords = require("./c3-number-to-words");
import c4RomanNumerals = require("./c4-roman-numerals");
import c5Add = require("./c5-add");
import c6BinaryTree = require("./c6-binary-tree");
import c7PrimeNumbers = require("./c7-prime-numbers");
import c8Palindromes = require("./c8-palindromes");
import c9ObjectMerge = require("./c9-object-merge");
import c10ArrayFlatten = require("./c10-array-flatten");

export type PrimativeValue = string | number | object;
export type Primative = PrimativeValue | PrimativeValue[];
export type Rule = "no-sort" | "no-add" | "no-eval";

export interface Challenge {
  title: string;
  input: Primative;
  output: Primative;
  description: string;
  example: string;
  rules?: Rule[];
}

export const challenges: { [key: string]: Challenge } = {
  "c1-number-reader": c1NumberReader,
  "c2-sort-the-numbers": c2SortTheNumbers,
  "c3-number-to-words": c3NumberToWords,
  "c4-roman-numerals": c4RomanNumerals,
  "c5-add": c5Add,
  "c6-binary-tree": c6BinaryTree,
  "c7-prime-numbers": c7PrimeNumbers,
  "c8-palindromes": c8Palindromes,
  "c9-object-merge": c9ObjectMerge,
  "c10-array-flatten": c10ArrayFlatten,
};
