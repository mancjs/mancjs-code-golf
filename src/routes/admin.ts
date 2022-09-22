import express = require('express');
import expressBasicAuth = require('express-basic-auth');

import * as game from '../game/game';
import * as challengeLibrary from '../game/challenge-library';

const DEFAULT_TIME_LIMIT = 20;

const app = express();

const authorizer = (username: string, password: string) => {
  return username === 'admin' && password === process.env['CG_ADMIN_PASSWORD'];
};

app.use(expressBasicAuth({ authorizer, challenge: true }));

app.get('/admin', (_req, res) => {
  return res.render('admin', {
    gameData: JSON.stringify(game.get(), undefined, 2),
    challenge: game.getCurrentChallenge(),
    challengeList: challengeLibrary.getChallenges(),
    timeLimitMinutes:
      game.getTimeRemainingSeconds() > 0 ? '' : DEFAULT_TIME_LIMIT,
    game: game.get(),
  });
});

app.post('/start', (req, res) => {
  const timeLimitMinutes: string | undefined = req.body.timeLimitMinutes;

  game.start({
    key: req.body.key,
    timeLimitMinutes: timeLimitMinutes
      ? parseFloat(timeLimitMinutes)
      : undefined,
  });

  return res.redirect('/admin');
});

app.get('/stop', (_req, res) => {
  game.stop();
  return res.redirect('/admin');
});

app.get('/challenge', (req, res) => {
  const key = req.query.key?.toString();
  const challenge = key && challengeLibrary.getChallenge(key);
  return challenge ? res.json({ ...challenge, key }) : res.status(404).end();
});

export default app;
