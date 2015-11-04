var fs = require('fs');
var vm = require('vm');
var _ = require('underscore');

var global = {};

var formatTypeAndValue = function(value, actual) {
  var getType = function(value) {
    if (_.isArray(value)) return 'array';
    return typeof value;
  };

  var type = getType(value);

  if (type === 'undefined') return 'undefined';
  if (type === 'function') return 'function';
  if (type === 'array') return (actual ? 'different ' : '') + 'array of ' + value.length + ' items';
  if (type === 'string') return (actual ? 'different ' : '') + 'string of ' + value.length + ' chars';

  var digits = value.toString().replace(/[^0-9]/g, '').length;
  return digits + ' digit number';
};

process.on('message', function(entry) {
  var error = function(expected, actual) {
    var expectedError = formatTypeAndValue(expected, false);
    var actualError = formatTypeAndValue(actual, true);

    return process.send({
      valid: false,
      err: 'expected ' + expectedError + ', got ' + actualError
    });
  };

  try {
    var submission = fs.readFileSync(entry.file, 'utf8');

    var script = '';
    script += '"use strict";\n';
    script += 'Array.prototype.sort = function() { throw true; };\n';
    script += submission;

    vm.runInNewContext(script, global);

    if (!global.play) {
      return process.send({ valid: false, err: 'No global play function defined' });
    }

    var actualOutput = global.play(eval(entry.input));
    var expectedOutput = eval(entry.output);

    if (_.isArray(actualOutput) && _.isArray(expectedOutput)) {
      if (actualOutput.toString() !== expectedOutput.toString()) {
        return error(expectedOutput, actualOutput);
      }
    } else if (actualOutput !== expectedOutput) {
      return error(expectedOutput, actualOutput);
    }

    process.send({ valid: true });
  } catch (err) {
    var message = 'Your script is broken';

    if (err.message && err.message.match(/is not defined/g)) {
      message += ': ' + err.message;
    }

    console.log('team: ' + entry.team);
    console.log(err);
    console.log('----');

    process.send({ valid: false, err: message });
  }
});