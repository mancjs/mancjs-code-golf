var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var _ = require('underscore');

var game;
var savePath = __dirname + '/data/game.json';

var start = function(data) {
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
    entries: []
  };

  save();
};

var stop = function() {
  if (game) game.running = false;
  save();
};

var get = function() {
  return game;
};

var addEntry = function(data) {
  var createKey = function() {
    return (Math.round(Math.random() * 100000000000)).toString(36);
  };

  var getGravatarUrl = function(email) {
    var hash = crypto.createHash('md5').update(email).digest('hex');
    return 'http://www.gravatar.com/avatar/' + hash + '?s=130';
  };

  var countStrokes = function(file) {
    if (fs.existsSync(file)) {
      var contents = fs.readFileSync(file, 'utf8').replace(/\s/g, '');
      return contents.length;
    }
  };

  if (!game.running) return { err: 'Game is not running' };;

  var entry = _.findWhere(game.entries, { email: data.email });

  if (entry && entry.key !== data.key) {
    return { err: 'This email address is taken' };
  }

  if (!entry) {
    if (!data.email) return { err: 'Enter an email address' };
    if (!data.team)  return { err: 'Enter a team name' };
    if (!data.file)  return { err: 'No file was selected' };

    entry = {
      email: data.email,
      gravatar: getGravatarUrl(data.email),
      team: data.team,
      file: data.file,
      key: createKey(),
      strokes: countStrokes(data.file),
      updated: new Date
    };

    game.entries.push(entry);
    save();
    return { entry: entry };
  }

  if (entry && entry.key === data.key) {
    entry.updated = new Date;
    entry.file = data.file;
    entry.strokes = countStrokes(data.file);
    save();
    return { entry: entry };
  }
};

var setValid = function(key, valid) {
  var entry = _.findWhere(game.entries, { key: key });

  if (entry) {
    entry.valid = valid;
    save();
  }
};

var save = function() {
  fs.writeFileSync(savePath, JSON.stringify(game));
};

var load = function() {
  if (fs.existsSync(savePath)) {
    game = JSON.parse(fs.readFileSync(savePath, 'utf8'));
  }
};

load();

module.exports = {
  addEntry: addEntry,
  setValid: setValid,
  start: start,
  stop: stop,
  get: get
};
