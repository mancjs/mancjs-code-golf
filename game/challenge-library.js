// @flow

const fs = require('fs');
const path = require('path');

const challengesDir = path.join(__dirname, '..', 'challenges');

let _challenges;

const validChallenge = (folder) => {
  const folderPath = path.join(challengesDir, folder);
  const challengeJsonPath = path.join(folderPath, 'challenge.json');

  return fs.existsSync(challengeJsonPath);
};

const readChallenge = (folder) => {
  const folderPath = path.join(challengesDir, folder);
  const challengeJsonPath = path.join(folderPath, 'challenge.json');

  const challengeJson = JSON.parse(fs.readFileSync(challengeJsonPath, 'utf8'));

  return {
    key: folder,
    title: challengeJson.title,
    input: JSON.stringify(challengeJson.input),
    output: JSON.stringify(challengeJson.output),
    description: challengeJson.description
  };
};

const loadChallenges = () => {
  const folders = fs.readdirSync(challengesDir);

  return folders.filter(validChallenge).map(readChallenge);
};

const getChallenges = () => {
  if (_challenges) return _challenges;

  return _challenges = loadChallenges();
};

const getChallenge = (key /*:string*/) => {
  const challenges = getChallenges();

  const matches = challenges.filter(c => c.key === key);

  return matches.length > 0 ? matches[0] : null;
};

module.exports = {
  getChallenges,
  getChallenge
};
