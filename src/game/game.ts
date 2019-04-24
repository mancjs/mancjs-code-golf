import fs = require('fs');
import path = require('path');
import crypto = require('crypto');
import lodash = require('lodash');
import { challenges } from '../challenges';

const DEFAULT_TIME_LIMIT = 10;

interface GameStart {
  key: string;
  timeLimitMinutes?: number;
}

interface Game {
  key: string;
  running: boolean;
  expiresEpoch: number;
  entries: Entry[];
}

interface AddEntryRequest {
  email: string;
  team: string;
  answer: string;
  key: string;
}

interface Entry extends AddEntryRequest {
  gravatar: string;
  strokes: number;
  updated: Date;
  valid: boolean;
}

const jsmin = require('jsmin').jsmin;

let game: Game | undefined;
let expiresTimeout: NodeJS.Timer | undefined;
const savePath = path.join(__dirname, '..', '..', 'data', 'game.json');

const start = (data: GameStart) => {
  const getNewExpires = (timeLimitMinutes: number) => {
    return (Date.now() / 1000) + (timeLimitMinutes * 60);
  };

  if (data.timeLimitMinutes && isNaN(data.timeLimitMinutes)) {
    throw new Error('Invalid time limit');
  }

  if (game && game.key === data.key) {
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
  if (!game || !game.running) return;

  clearCountdown();

  const expiresAt = (game.expiresEpoch * 1000 - Date.now());

  expiresTimeout = setTimeout(stop, expiresAt);
};

const clearCountdown = () => {
  if (expiresTimeout) {
    clearTimeout(expiresTimeout);

    expiresTimeout = undefined;
  }
};

const stop = () => {
  if (game) {
    game.running = false;
  }

  clearCountdown();

  return save();
};

const get = () => {
  return game;
};

const getCurrentChallenge = () => {
  return game ? challenges[game.key] : null;
};

const getOrError = () => {
  if (!game) throw new Error('No game');

  return game;
};

const getTimeRemainingSeconds = () => {
  if (game && game.running) {
    return (game.expiresEpoch - (Date.now() / 1000));
  }
};

const addEntry = (data: AddEntryRequest): { entry?: Partial<Entry>, err?: string } => {

  console.log(data);

  const createKey = () => {
    return (Math.round(Math.random() * 100000000000)).toString(36);
  };

  const getGravatarUrl = (email: string) => {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    return `http://www.gravatar.com/avatar/${hash}'?s=130&d=wavatar`;
  };

  const countStrokes = (answer: string) => {
    if (answer) {
      try {
        const contents = jsmin(answer, 3).replace(/^\n+/, '');
        return contents.length;
      } catch (e) {
        return { err: 'error counting strokes'};
      }
    }
  };

  if (!game || !game.running) {
    return { err: 'Game is not running' };
  }

  let entry = lodash.find(game.entries, { email: data.email });

  if (entry && entry.key !== data.key) {
    return { err: 'This email address is taken' };
  }

  if (!entry) {
    if (!data.email) return { err: 'Enter an email address' };
    if (!data.team) return { err: 'Enter a team name' };
    if (!data.answer) return { err: 'No answer was input' };

    try {
      const strokes = countStrokes(data.answer);
      if (strokes.err) {
        return strokes;
      }

      entry = {
        email: data.email,
        gravatar: getGravatarUrl(data.email),
        team: data.team,
        answer: data.answer,
        key: createKey(),
        strokes: strokes,
        updated: new Date(),
        valid: false,
      };

      game.entries.push(entry);
      save();
      return { entry };
    } catch (e) {
      return { err: e.message };
    }
  }

  if (entry && entry.key === data.key) {
    entry.updated = new Date;
    entry.answer = data.answer;
    entry.strokes = countStrokes(data.answer);
    save();
    return { entry };
  }

  return { err: 'Unknown error' };
};

const setValid = (key: string, valid: boolean) => {
  if (!game) return;

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

export {
  GameStart,
  Game,
  Entry,
  addEntry,
  setValid,
  start,
  stop,
  get,
  getCurrentChallenge,
  getOrError,
  getTimeRemainingSeconds,
};
