import child_process = require('child_process');

import { getChallenge } from './challenge-library';
import type { VerifyJob } from './verifier';
import * as game from './game';

const MAX_RUNTIME = 10000;

export const verify = (
  file: string,
  callback: (res: { valid: false; err: string }) => void
) => {
  const currentGame = game.getOrError();
  const verifier = child_process.fork(__dirname + '/verifier');
  const challenge = getChallenge(currentGame.key);

  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const job: VerifyJob = {
    file,
    input: challenge.input,
    output: challenge.output,
    rules: challenge.rules || [],
  };

  verifier.send(job);

  const timer = setTimeout(() => {
    verifier.kill();

    return callback({
      valid: false,
      err: `script took too long to complete (${MAX_RUNTIME / 1000}s)`,
    });
  }, MAX_RUNTIME);

  verifier.on('message', (result: any) => {
    clearTimeout(timer);
    return callback({ valid: result.valid, err: result.err });
  });
};
