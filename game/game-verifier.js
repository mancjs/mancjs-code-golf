var child = require('child_process');
var game = require('./game');

var verify = function(file, team, callback) {
  var currentGame = game.get();
  var verifier = child.fork(__dirname + '/verifier');

  verifier.send({
    file: file,
    team: team,
    input: currentGame.input,
    output: currentGame.output
  });

  var timer = setTimeout(function() {
    verifier.kill();
    return callback({ valid: false, err: 'script took too long (5s)' });
  }, 5000);

  verifier.on('message', function(result) {
    clearTimeout(timer);
    return callback({ valid: result.valid, err: result.err });
  });
};

module.exports = {
  verify: verify
};