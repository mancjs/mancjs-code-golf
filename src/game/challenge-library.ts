import { challenges } from '../challenges';

export const getChallenges = () => {
  const keys = Object.keys(challenges);

  return keys
    .map((key) => {
      const challenge = challenges[key];

      if (!challenge) {
        return null;
      }

      const { title, description } = challenge;

      return {
        key,
        title,
        description,
      };
    })
    .filter(
      (challenge): challenge is Exclude<typeof challenge, null> =>
        challenge !== null
    );
};

export const getChallenge = (key: string) => {
  return challenges[key];
};
