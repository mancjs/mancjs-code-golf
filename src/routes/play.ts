import fs = require('fs');
import lodash = require('lodash');
import express = require('express');
import multiparty = require('multiparty');
import game = require('../game/game');
import { Game, Entry } from '../game/game';
import gameVerifier = require('../game/game-verifier');
import { challenges } from '../challenges';

const app = express();

app.get('/', (req, res) => {
  const currentGame = game.get();

  if (!currentGame) {
    return res.render('no-game');
  }

  const session = {
    email: req.query.email,
    team: req.query.team,
    key: req.query.key,
  };

  // tslint:disable-next-line:max-line-length
  const validEntries = lodash.sortBy(lodash.filter(currentGame.entries, { valid: true }), 'strokes');
  // tslint:disable-next-line:max-line-length
  const invalidEntries = lodash.sortBy(lodash.filter(currentGame.entries, { valid: false }), 'strokes');

  const allEntries = validEntries.concat(invalidEntries);

  const challenge = challenges[currentGame.key];

  return res.render('play', {
    session,
    challenge,
    game: currentGame,
    entries: allEntries,
    err: req.query.err,
    autoreload: req.query.autoreload === 'true',
    showaddentry: req.query.autoreload !== 'true',
  });
});

app.get('/solution/:key', (req, res) => {
  const getSolution = (game: Game, key: string) => {
    const entry = lodash.find(game.entries, { key });

    if (entry) {
      return fs.readFileSync(entry.file, 'utf8');
    }
  };

  const currentGame = game.getOrError();
  const solution = getSolution(currentGame, req.query.key);

  if (currentGame.running) {
    return res.send(403);
  }

  return res.set('Content-Type', 'text/plain').send(solution || 'No solution found');
});

app.post('/submit', (req, res) => {
  const redirect = (result: Partial<Entry>, err: {}) => {
    const url = '/?email=' + (result.email || '')
      + '&team=' + (result.team || '')
      + '&key=' + (result.key || '')
      + '&err=' + (err || '');

    return res.redirect(url);
  };

  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    const email = fields['email'][0];
    const team = fields['team'][0];
    const key = fields['key'][0];

    const file = files && files['file'] && files['file'][0] ? files['file'][0].path : null;

    const entry = {
      email,
      team,
      key,
      file,
    };

    const result = game.addEntry(entry);

    if (result.err) {
      return redirect(result.entry || {}, result.err);
    }

    gameVerifier.verify(entry.file, (status) => {
      if (result.entry && result.entry.key) {
        game.setValid(result.entry.key, status.valid);
      }

      return redirect(result.entry || {}, status.err);
    });
  });
});

export = app;
