import fs = require('fs');
import lodash = require('lodash');
import express = require('express');
import multiparty = require('multiparty');

import * as game from '../game/game';
import { verify } from '../game/game-verifier';
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

  const challenge = challenges[currentGame.key];
  const timeRemaining = game.getTimeRemainingSeconds();

  let clock = '';

  if (timeRemaining > 0) {
    const min = Math.floor(timeRemaining / 60).toString();
    const sec = Math.floor(timeRemaining % 60)
      .toString()
      .padStart(2, '0');
    clock = [min, sec].join(':');
  } else {
    clock = '0:00';
  }

  const validEntries = lodash.sortBy(
    lodash.filter(currentGame.entries, { valid: true }),
    'strokes'
  );
  const invalidEntries = lodash.sortBy(
    lodash.filter(currentGame.entries, { valid: false }),
    'strokes'
  );

  return res.render('play', {
    session,
    challenge,
    clock,
    game: currentGame,
    entries: [...validEntries, ...invalidEntries],
    err: req.query.err,
    autoreload: req.query.autoreload === 'true',
    showaddentry: req.query.autoreload !== 'true',
  });
});

app.get('/solution/:key', (req, res) => {
  const getSolution = (game: game.Game, key: string) => {
    const entry = lodash.find(game.entries, { key });

    if (entry) {
      return fs.readFileSync(entry.file, 'utf8');
    }
  };

  const currentGame = game.getOrError();
  const solution = getSolution(currentGame, req.params.key);

  if (currentGame.running) {
    return res.send(403);
  }

  return res
    .set('Content-Type', 'text/plain')
    .send(solution || 'No solution found');
});

app.post('/submit', (req, res) => {
  const redirect = (result: Partial<game.Entry>, err: {}) => {
    const url = [
      '/?email=',
      result.email,
      '&team=',
      result.team,
      '&key=',
      result.key,
      '&err=',
      err,
    ]
      .filter((p) => !!p)
      .join('');

    return res.redirect(url);
  };

  const form = new multiparty.Form();

  form.parse(req, (_err, fields, files) => {
    const email = fields['email'][0];
    const team = fields['team'][0];
    const key = fields['key'][0];

    const file =
      files && files['file'] && files['file'][0] ? files['file'][0].path : null;

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

    verify(entry.file, (status) => {
      if (result?.entry?.key) {
        game.setValid(result.entry.key, status.valid);
      }

      return redirect(result.entry || {}, status.err);
    });
  });
});

export default app;
