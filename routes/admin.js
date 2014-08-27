var game = require('../game/game');
var express = require('express');

var auth = express.basicAuth(function(user, pass) {
  return user === 'admin' && pass === 'admin';
});

var routes = function(app) {
  app.get('/admin', auth, function(req, res) {
    var gameData = JSON.stringify(game.get(), undefined, 2);
    return res.render('admin', { game: game.get(), gameData: gameData });
  });

  app.post('/start', auth, function(req, res) {
    var data = {
      title: req.param('title'),
      description: req.param('description'),
      input: req.param('input'),
      output: req.param('output')
    };

    game.start(data);
    return res.redirect('/admin');
  });

  app.get('/stop', auth, function(req, res) {
    game.stop();
    return res.redirect('/admin');
  });
};

module.exports = routes;