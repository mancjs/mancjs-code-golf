import { challenges } from "../challenges";

export const getChallenges = () => {
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

export const getChallenge = (key: string) => {
  return challenges[key];
};
