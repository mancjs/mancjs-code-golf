import fs = require('fs');
import path = require('path');
import crypto = require('crypto');
import lodash = require('lodash');
const { jsmin } = require('jsmin');

import { challenges } from '../challenges';

const DEFAULT_TIME_LIMIT = 20;

export interface GameStart {
  key: string;
  timeLimitMinutes?: number;
}

export interface Game {
  key: string;
  running: boolean;
  expiresEpoch: number;
  entries: Entry[];
}

interface AddEntryRequest {
  email: string;
  team: string;
  file: string;
  key: string;
}

export interface Entry extends AddEntryRequest {
  gravatar: string;
  strokes: number;
  updated: Date;
  valid: boolean;
}

let game: Game | undefined;
let expiresTimeout: NodeJS.Timer | undefined;
const savePath = path.join(__dirname, '..', '..', 'data', 'game.json');

export const start = (data: GameStart) => {
  const getNewExpires = (timeLimitMinutes: number) => {
    return Date.now() / 1000 + timeLimitMinutes * 60;
  };

  if (data.timeLimitMinutes && isNaN(data.timeLimitMinutes)) {
    throw new Error('Invalid time limit');
  }

  if (game?.key === data.key) {
    game.running = true;

    if (data.timeLimitMinutes) {
      game.expiresEpoch = getNewExpires(data.timeLimitMinutes);
    }

    return save();
  }

  const timeLimitMinutes = data.timeLimitMinutes || DEFAULT_TIME_LIMIT;

  game = {
    key: data.key,
    running: true,
    expiresEpoch: getNewExpires(timeLimitMinutes),
    entries: [],
  };

  return save();
};

const applyCountdown = () => {
  if (!game?.running) {
    return;
  }

  clearCountdown();
  expiresTimeout = setTimeout(stop, game.expiresEpoch * 1000 - Date.now());
};

const clearCountdown = () => {
  if (expiresTimeout) {
    clearTimeout(expiresTimeout);
    expiresTimeout = undefined;
  }
};

export const stop = () => {
  if (game) {
    game.running = false;
  }

  clearCountdown();
  return save();
};

export const get = () => {
  return game;
};

export const getCurrentChallenge = () => {
  return game ? challenges[game.key] : null;
};

export const getOrError = () => {
  if (!game) {
    throw new Error('No game');
  }

  return game;
};

export const getTimeRemainingSeconds = () => {
  if (!game?.running) {
    return 0;
  }

  return game.expiresEpoch - Date.now() / 1000;
};

export const addEntry = (
  data: AddEntryRequest
): { entry?: Partial<Entry>; err?: string } => {
  const createKey = () => {
    return Math.round(Math.random() * 100000000000).toString(36);
  };

  const getGravatarUrl = (email: string) => {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    return 'http://www.gravatar.com/avatar/' + hash + '?s=130&d=wavatar';
  };

  const countStrokes = (file: string) => {
    if (fs.existsSync(file)) {
      const contents = jsmin(fs.readFileSync(file, 'utf8'), 3).replace(
        /^\n+/,
        ''
      );
      return contents.length;
    }
  };

  if (!game?.running) {
    return { err: 'Game is not running' };
  }

  let entry = lodash.find(game.entries, { email: data.email });

  if (entry && entry.key !== data.key) {
    return { err: 'This email address is taken' };
  }

  if (!entry) {
    if (!data.email) {
      return { err: 'Enter an email address' };
    }

    if (!data.team) {
      return { err: 'Enter a team name' };
    }

    if (!data.file) {
      return { err: 'No file was selected' };
    }

    entry = {
      key: createKey(),
      email: data.email,
      gravatar: getGravatarUrl(data.email),
      team: data.team,
      file: data.file,
      strokes: countStrokes(data.file),
      valid: false,
      updated: new Date(),
    };

    game.entries.push(entry);
    save();
    return { entry };
  }

  if (entry?.key === data.key) {
    entry.updated = new Date();
    entry.file = data.file;
    entry.strokes = countStrokes(data.file);
    save();
    return { entry };
  }

  return { err: 'Unknown error' };
};

export const setValid = (key: string, valid: boolean) => {
  if (!game) {
    return;
  }

  const entry = lodash.find(game.entries, { key });

  if (entry) {
    entry.valid = valid;
    return save();
  }
};

const save = () => {
  applyCountdown();
  return fs.writeFileSync(savePath, JSON.stringify(game));
};

const load = () => {
  if (fs.existsSync(savePath)) {
    game = JSON.parse(fs.readFileSync(savePath, 'utf8'));
    applyCountdown();
  }
};

load();
