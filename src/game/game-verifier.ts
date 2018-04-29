import child_process = require('child_process');
import game = require('./game');

const verify = (file: string, callback: (res: { valid: false, err: string }) => void) => {
  const currentGame = game.getOrError();
  const verifier = child_process.fork(__dirname + '/verifier');

  verifier.send({
    file,
    input: currentGame.input,
    output: currentGame.output,
  });

  const timer = setTimeout(() => {
    verifier.kill();
    return callback({ valid: false, err: 'script took too long (5s)' });
  },                       5000);

  verifier.on('message', (result) => {
    clearTimeout(timer);
    return callback({ valid: result.valid, err: result.err });
  });
};

export {
  verify,
};
