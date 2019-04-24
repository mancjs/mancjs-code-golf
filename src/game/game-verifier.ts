import child_process = require('child_process');
import game = require('./game');
import { VerifyJob } from './verifier';
import { getChallenge } from './challenge-library';

const verify = (answer: string, callback: (res: { valid: false, err: string }) => void) => {
  const currentGame = game.getOrError();
  const verifier = child_process.fork(__dirname + '/verifier');

  const challenge = getChallenge(currentGame.key);

  if (!challenge) throw new Error('Challenge not found');

  const job: VerifyJob = {
    answer,
    input: challenge.input,
    output: challenge.output,
    rules: challenge.rules || [],
  };

  verifier.send(job);

  const timer = setTimeout(
    () => {
      verifier.kill();
      return callback({ valid: false, err: 'script took too long (5s)' });
    },
    5000,
  );

  verifier.on('message', (result) => {
    clearTimeout(timer);
    return callback({ valid: result.valid, err: result.err });
  });
};

export {
  verify,
};
