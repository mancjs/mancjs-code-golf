var fs = require('fs');
var game = require('../game/game');
var gameVerifier = require('../game/game-verifier');
var _ = require('underscore');

var routes = function(app) {
  app.get('/', function(req, res) {
    var currentGame = game.get();

    if (!currentGame) {
      return res.render('no-game');
    }

    var session = {
      email: req.param('email'),
      team: req.param('team'),
      key: req.param('key')
    };

    var validEntries = _.sortBy(_.where(currentGame.entries, { valid: true }), 'strokes');
    var invalidEntries = _.sortBy(_.where(currentGame.entries, { valid: false }), 'strokes');
    var allEntries = validEntries.concat(invalidEntries);

    return res.render('play', {
      game: currentGame,
      entries: allEntries,
      session: session,
      err: req.param('err'),
      autoreload: req.param('autoreload') === 'true'
    });
  });

  app.get('/solution/:key', function(req, res) {
    var getSolution = function(game, key) {
      var entry = _.findWhere(game.entries, { key: key });

      if (entry) {
        return fs.readFileSync(entry.file, 'utf8');
      }
    };

    var currentGame = game.get();
    var solution = getSolution(currentGame, req.param('key'));

    if (currentGame.running)
      return res.send(403);

    return res.set('Content-Type', 'text/plain').send(solution || 'No solution found');
  });

  app.post('/submit', function(req, res) {
    var redirect = function(result, err) {
      var url = '/?email=' + (result.email || '')
              + '&team=' + (result.team || '')
              + '&key=' + (result.key || '')
              + '&err=' + (err || '');

      return res.redirect(url);
    };

    var file = req.files['file'];

    var entry = {
      email: req.param('email'),
      team: req.param('team'),
      key: req.param('key'),
      file: file ? file.path : null
    };

    var result = game.addEntry(entry);

    if (result.err) {
      return redirect(result.entry || {}, result.err);
    }

    gameVerifier.verify(entry.file, entry.team, function(status) {
      game.setValid(result.entry.key, status.valid);
      return redirect(result.entry || {}, status.err);
    });
  });
};

module.exports = routes;