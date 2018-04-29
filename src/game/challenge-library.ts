import fs = require('fs');
import path = require('path');

interface Challenge {
  key: string;
  title: string;
  input: string;
  output: string;
  description: string;
}

const challengesDir = path.join(__dirname, '..', '..', 'challenges');

let challenges: Challenge[] | undefined;

const validChallenge = (folder: string) => {
  const folderPath = path.join(challengesDir, folder);
  const challengeJsonPath = path.join(folderPath, 'challenge.json');

  return fs.existsSync(challengeJsonPath);
};

const readChallenge = (folder: string): Challenge => {
  const folderPath = path.join(challengesDir, folder);
  const challengeJsonPath = path.join(folderPath, 'challenge.json');

  const challengeJson = JSON.parse(fs.readFileSync(challengeJsonPath, 'utf8'));

  return {
    key: folder,
    title: challengeJson.title,
    input: JSON.stringify(challengeJson.input),
    output: JSON.stringify(challengeJson.output),
    description: challengeJson.description,
  };
};

const loadChallenges = () => {
  const folders = fs.readdirSync(challengesDir);

  return folders.filter(validChallenge).map(readChallenge);
};

const getChallenges = () => {
  if (challenges) return challenges;

  return challenges = loadChallenges();
};

const getChallenge = (key: string) => {
  const challenges = getChallenges();

  const matches = challenges.filter(c => c.key === key);

  return matches.length > 0 ? matches[0] : null;
};

export {
  getChallenges,
  getChallenge,
};
