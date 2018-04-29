import fs = require('fs');
import crypto = require('crypto');
import lodash = require('lodash');

interface GameStart {
  title: string;
  description: string;
  input: string;
  output: string;
}

interface Game {
  title: string;
  description: string;
  input: string;
  output: string;
  running: boolean;
  entries: Entry[];
}

interface AddEntryRequest {
  email: string;
  team: string;
  file: string;
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
const savePath = __dirname + '/data/game.json';

const start = function (data: GameStart) {
  if (game && game.title === data.title) {
    game.description = data.description;
    game.input = data.input;
    game.output = data.output;
    game.running = true;
    return save();
  }

  game = {
    title: data.title,
    description: data.description,
    input: data.input,
    output: data.output,
    running: true,
    entries: [],
  };

  return save();
};

const stop = function () {
  if (game) {
    game.running = false;
  }

  return save();
};

const get = function () {
  return game;
};

const getOrError = function () {
  if (!game) throw new Error('No game');

  return game;
};

const addEntry = function (data: AddEntryRequest): { entry?: Partial<Entry>, err?: string } {
  const createKey = function () {
    return (Math.round(Math.random() * 100000000000)).toString(36);
  };

  const getGravatarUrl = function (email: string) {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    return 'http://www.gravatar.com/avatar/' + hash + '?s=130&d=wavatar';
  };

  const countStrokes = function (file: string) {
    if (fs.existsSync(file)) {
      const contents = jsmin(fs.readFileSync(file, 'utf8'), 3).replace(/^\n+/, '');
      return contents.length;
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
    if (!data.file) return { err: 'No file was selected' };

    entry = {
      email: data.email,
      gravatar: getGravatarUrl(data.email),
      team: data.team,
      file: data.file,
      key: createKey(),
      strokes: countStrokes(data.file),
      updated: new Date(),
      valid: false,
    };

    game.entries.push(entry);
    save();
    return { entry };
  }

  if (entry && entry.key === data.key) {
    entry.updated = new Date;
    entry.file = data.file;
    entry.strokes = countStrokes(data.file);
    save();
    return { entry };
  }

  return { err: 'Unknown error' };
};

const setValid = function (key: string, valid: boolean) {
  if (!game) return;

  const entry = lodash.find(game.entries, { key });

  if (entry) {
    entry.valid = valid;
    return save();
  }
};

const save = function () {
  return fs.writeFileSync(savePath, JSON.stringify(game));
};

const load = function () {
  if (fs.existsSync(savePath)) {
    game = JSON.parse(fs.readFileSync(savePath, 'utf8'));
  }
};

load();

export {
  Game,
  Entry,
  addEntry,
  setValid,
  start,
  stop,
  get,
  getOrError,
};
