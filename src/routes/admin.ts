import express = require('express');
import game = require('../game/game');

const basicAuth = require('express-basic-auth');

const challengeLibrary = require('../game/challenge-library');

const routes = (app: express.Application) => {
  const authorizer = (username: string, password: string) => {
    return username === 'admin' && password === 'admin';
  };

  app.use(basicAuth({ authorizer }));

  app.get('/admin', (req, res) => {
    const challenges = challengeLibrary.getChallenges();

    const gameData = JSON.stringify(game.get(), undefined, 2);

    return res.render('admin', {
      gameData,
      challenges,
      game: game.get(),
    });
  });

  app.post('/start', (req, res) => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      input: req.body.input,
      output: req.body.output,
    };

    game.start(data);
    return res.redirect('/admin');
  });

  app.get('/stop', (req, res) => {
    game.stop();
    return res.redirect('/admin');
  });

  app.get('/challenge', (req, res) => {
    const key = req.query.key;

    const challenge = challengeLibrary.getChallenge(key);

    return res.json(challenge);
  });
};

export = routes;
