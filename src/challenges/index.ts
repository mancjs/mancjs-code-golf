import c1NumberReader = require('./c1-number-reader');
import c2SortTheNumbers = require('./c2-sort-the-numbers');
import c3NumberToWords = require('./c3-number-to-words');
import c4ArabicRoman = require('./c4-arabic-roman');
import c5Add = require('./c5-add');

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

type PrimativeValue = string | number;
type Primative = PrimativeValue | PrimativeValue[];

type Rule = 'no-sort' | 'no-add' | 'no-eval';

const challenges: Challenges = {
  'c1-number-reader': c1NumberReader,
  'c2-sort-the-numbers': c2SortTheNumbers,
  'c3-number-to-words': c3NumberToWords,
  'c4-arabic-roman': c4ArabicRoman,
  'c5-add': c5Add,
};

export {
  Primative,
  Challenge,
  Rule,
  challenges,
};
