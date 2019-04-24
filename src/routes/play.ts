import fs = require('fs');
import lodash = require('lodash');
import express = require('express');
import multiparty = require('multiparty');
import game = require('../game/game');
import { Game, Entry } from '../game/game';
import gameVerifier = require('../game/game-verifier');
import { challenges } from '../challenges';
import path = require('path');

const app = express();

app.get('/loader.js', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/loader.js'));
});

app.get('/editor.main.nls.js', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/editor/editor.main.nls.js'));
});

app.get('/editor.main.js', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/editor/editor.main.js'));
});

app.get('/vs', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs'));
});

app.get('/editor.main.css', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/editor/editor.main.css'));
});

app.get('/vs/language/typescript/tsMode.js', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/language/typescript/tsMode.js'));
});

app.get('/vs/language/typescript/javascript.js', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/language/typescript/javascript.js'));
});

app.get('/vs/base/worker/workerMain.js', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/base/worker/workerMain.js'));
});

app.get('/vs/language/typescript/tsWorker.js', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/language/typescript/tsWorker.js'));
});

app.get('/vs/basic-languages/javascript/javascript.js', (req, res) => {
  res.sendFile(path.resolve('node_modules/monaco-editor/min/vs/basic-languages/javascript/javascript.js'));
});

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

  const currentEntry = (<Entry | undefined>lodash.find(currentGame.entries, { email: session.email }));
  const currentAnswer = currentEntry ? currentEntry.answer : '';

  // tslint:disable-next-line:max-line-length
  const validEntries = lodash.sortBy(lodash.filter(currentGame.entries, { valid: true }), 'strokes');
  // tslint:disable-next-line:max-line-length
  const invalidEntries = lodash.sortBy(lodash.filter(currentGame.entries, { valid: false }), 'strokes');

  const allEntries = validEntries.concat(invalidEntries);

  const challenge = challenges[currentGame.key];

  const timeRemaining = game.getTimeRemainingSeconds();

  let clock: string | undefined;

  if (timeRemaining && timeRemaining > 0) {
    const min = Math.floor(timeRemaining / 60).toString();
    const sec = Math.floor(timeRemaining % 60).toString().padStart(2, '0');

    clock = [min, sec].join(':');
  } else {
    clock = '0:00';
  }

  return res.render('play', {
    session,
    challenge,
    clock,
    currentAnswer,
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
      return entry.answer;
    }
  };

  const currentGame = game.getOrError();
  const solution = getSolution(currentGame, req.params.key);

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
    const answer = fields['answer'][0];

    const file = files && files['file'] && files['file'][0] ? files['file'][0].path : null;

    const entry = {
      email,
      team,
      key,
      answer,
    };

    const result = game.addEntry(entry);

    if (result.err) {
      return redirect(result.entry || {}, result.err);
    }

    gameVerifier.verify(entry.answer, (status) => {
      if (result.entry && result.entry.key) {
        game.setValid(result.entry.key, status.valid);
      }

      return redirect(result.entry || {}, status.err);
    });
  });
});

export = app;
