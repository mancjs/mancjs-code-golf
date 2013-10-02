var fs = require('fs');
var vm = require('vm');
var _ = require('underscore');

var global = {};

Array.prototype.sort = function() {
  return [];
};

var formatTypeAndValue = function(value) {
  var getType = function(value) {
    if (_.isArray(value)) return 'array';
    return typeof value;
  };

  var type = getType(value);

  if (type === 'undefined') return 'undefined';
  if (type === 'function') return 'function';
  if (type === 'array') return 'array of ' + value.length + ' items';
  if (type === 'string') return 'string of ' + value.length + ' chars';

  var digits = value.toString().replace(/[^0-9]/g, '').length;
  return digits + ' digit number';
};

process.on('message', function(entry) {
  var raiseError = function(expected, actual) {
    var expectedError = formatTypeAndValue(expected);
    var actualError = formatTypeAndValue(actual);
    throw new Error('expected ' + expectedError + ', got ' + actualError);
  };

  try {
    vm.runInNewContext(fs.readFileSync(entry.file, 'utf8'), global);

    if (!global.play)
      throw new Error('no global play function defined');

    var actualOutput = global.play(eval(entry.input));
    var expectedOutput = eval(entry.output);

    if (_.isArray(actualOutput) && _.isArray(expectedOutput)) {
      if (actualOutput.toString() !== expectedOutput.toString()) {
        raiseError(expectedOutput, actualOutput);
      }
    } else if (actualOutput !== expectedOutput) {
      raiseError(expectedOutput, actualOutput);
    }

    process.send({ valid: true });
  } catch (err) {
    process.send({ valid: false, err: err.toString() });
  }
});
