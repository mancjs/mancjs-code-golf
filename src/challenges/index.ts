import c1NumberReader = require('./c1-number-reader');
import c2SortTheNumbers = require('./c2-sort-the-numbers');

interface Challenges {
  [key: string]: Challenge;
}

interface Challenge {
  title: string;
  input: Primative;
  output: Primative;
  description: string;
}

type PrimativeValue = string | number;
type Primative = PrimativeValue | PrimativeValue[];

const challenges: Challenges = {
  'c1-number-reader': c1NumberReader,
  'c2-sort-the-numbers': c2SortTheNumbers,
};

export {
  Primative,
  Challenge,
  challenges,
};
