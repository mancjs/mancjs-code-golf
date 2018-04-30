import fs = require('fs');
import vm = require('vm');
import lodash = require('lodash');
import { Primative } from '../challenges';

interface VerifyJob {
  file: string;
  input: Primative;
  output: Primative;
}

const global = {} as { play?: Function };

const formatTypeAndValue = (value: any, actual: any) => {
  const getType = function (value: any) {
    if (lodash.isArray(value)) return 'array';
    return typeof value;
  };

  const type = getType(value);

  if (type === 'undefined') return 'undefined';
  if (type === 'function') return 'function';
  if (type === 'array') return (actual ? 'different ' : '') + 'array of ' + value.length + ' items';
  // tslint:disable-next-line:max-line-length
  if (type === 'string') return (actual ? 'different ' : '') + 'string of ' + value.length + ' chars';

  const digits = value.toString().replace(/[^0-9]/g, '').length;
  return digits + ' digit number';
};

process.on('message', (entry: VerifyJob) => {
  const error = function (expected: any, actual: any) {
    const expectedError = formatTypeAndValue(expected, false);
    const actualError = formatTypeAndValue(actual, true);

    return process.send && process.send({
      valid: false,
      err: 'expected ' + expectedError + ', got ' + actualError,
    });
  };

  try {
    let script = fs.readFileSync(entry.file, 'utf8');
    script = 'Array.prototype.sort = function() { throw true; }; ' + script;
    vm.runInNewContext(script, global);

    if (!global.play) {
      return process.send && process.send({ valid: false, err: 'No global play function defined' });
    }

    const actualOutput = global.play(entry.input);
    const expectedOutput = entry.output;

    if (lodash.isArray(actualOutput) && lodash.isArray(expectedOutput)) {
      if (actualOutput.toString() !== expectedOutput.toString()) {
        return error(expectedOutput, actualOutput);
      }
    } else if (actualOutput !== expectedOutput) {
      return error(expectedOutput, actualOutput);
    }

    process.send && process.send({ valid: true });
  } catch (err) {
    console.error('Script error:', err);

    process.send && process.send({ valid: false, err: 'Your script is broken' });
  }
});

export {
  VerifyJob,
};
