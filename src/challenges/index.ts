import c1NumberReader = require('./c1-number-reader');
import c2SortTheNumbers = require('./c2-sort-the-numbers');
import c3NumberToWords = require('./c3-number-to-words');
import c4ArabicRoman = require('./c4-arabic-roman');
import c5Add = require('./c5-add');
import c6BinaryTree = require('./c6-binary-tree');
import c7PrimeGen = require('./c7-prime-gen');
import c8EvenFilter = require('./c8-even-filter');
import c9LargestNumber = require('./c9-largest-number');
import c10StringToArray = require('./c10-string-to-array');
import c11AlphabetSoup = require('./c11-alphabet-soup');
import c12TimeConvert = require('./c12-time-convert');
import c13ZerosToTheEnd = require('./c13-zeros-to-the-end');
import c14PowerOfThree = require('./c14-power-of-three');



interface Challenges {
  [key: string]: Challenge;
}

interface Challenge {
  title: string;
  input: Primative;
  output: Primative;
  description: string;
  rules?: Rule[];
}

type PrimativeValue = string | number | object | boolean;
type Primative = PrimativeValue | PrimativeValue[];

type Rule = 'no-sort' | 'no-add' | 'no-eval';

const challenges: Challenges = {
  'c1-number-reader': c1NumberReader,
  'c2-sort-the-numbers': c2SortTheNumbers,
  'c3-number-to-words': c3NumberToWords,
  'c4-arabic-roman': c4ArabicRoman,
  'c5-add': c5Add,
  'c6-binary-tree': c6BinaryTree,
  'c7-prime-gen': c7PrimeGen,
  'c8-even-filter': c8EvenFilter,
  'c9-largest-number': c9LargestNumber,
  'c10-string-to-array': c10StringToArray,
  'c11-alphabet-soup': c11AlphabetSoup,
  'c12-time-convert': c12TimeConvert,
  'c13-zeros-to-the-end': c13ZerosToTheEnd,
  'c14-power-of-three': c14PowerOfThree,
};

export {
  Primative,
  Challenge,
  Rule,
  challenges,
};
