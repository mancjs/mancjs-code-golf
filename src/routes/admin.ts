import express = require('express');
import expressBasicAuth = require('express-basic-auth');
import game = require('../game/game');
import challengeLibrary = require('../game/challenge-library');

const app = express();

const authorizer = (username: string, password: string) => {
  return username === 'admin' && password === 'admin';
};

app.use(expressBasicAuth({ authorizer, challenge: true }));

app.get('/admin', (req, res) => {
  const challengeList = challengeLibrary.getChallenges();

  const gameState = game.get();
  const challenge = game.getCurrentChallenge();

  const gameData = JSON.stringify(gameState, undefined, 2);

  return res.render('admin', {
    gameData,
    challenge,
    challengeList,
    game: game.get(),
  });
});

app.post('/start', (req, res) => {
  const data = {
    key: req.body.key,
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

  return res.json({ ...challenge, key });
});

export = app;
