import fs = require('fs');
import vm = require('vm');
import lodash = require('lodash');
import { Primative, Rule } from '../challenges';

interface VerifyJob {
  answer: string;
  input: Primative;
  output: Primative;
  rules: Rule[];
}

const global = {} as { play?: Function, eval?: undefined };

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

  const generalError = function (err: string) {
    return process.send && process.send({
      err,
      valid: false,
    });
  };

  try {
    const script = entry.answer;

    let header = '';
    header += '"use strict";\n';

    if (entry.rules.indexOf('no-sort') !== -1) {
      header += 'Array.prototype.sort = function() { throw true; };\n';
    }

    if (entry.rules.indexOf('no-add') !== -1) {
      if (script.indexOf('+') !== -1) {
        return generalError('The plus operator is forbidden');
      }
    }

    if (entry.rules.indexOf('no-eval') !== -1) {
      global.eval = undefined;

      if (script.indexOf('eval') !== -1) {
        return generalError('Nice try but I\'m not letting you use eval...');
      }
    }

    vm.runInNewContext(header + script, global);

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

    process.send && process.send({ valid: false, err: err.message });
  }
});

export {
  VerifyJob,
};
