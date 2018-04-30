import fs = require('fs');
import path = require('path');
import { challenges } from '../challenges';

interface ChallengeMeta {
  key: string;
  title: string;
}

const getChallenges = () => {
  const keys = Object.keys(challenges);

  return keys.map((key) => {
    const { title, description } = challenges[key];

    return {
      key,
      title,
      description,
    };
  });
};

const getChallenge = (key: string) => {
  return challenges[key];
};

export {
  getChallenges,
  getChallenge,
};
