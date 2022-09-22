import lodash from 'lodash';
import { readFileSync } from 'fs';
import { runInNewContext } from 'vm';
import { Primative, Rule } from '../challenges';

export interface VerifyJob {
  file: string;
  input: Primative;
  output: Primative;
  rules: Rule[];
}

interface GlobalScope {
  module: {
    exports?: Function;
  };
  eval?: undefined;
}

const global: GlobalScope = {
  module: {},
};

const formatTypeAndValue = (value: any, actual: any) => {
  const getType = (value: any) => {
    if (Array.isArray(value)) {
      return 'array';
    }

    return typeof value;
  };

  if (value === null) {
    return 'null';
  }

  const type = getType(value);

  if (type === 'undefined') {
    return 'undefined';
  }

  if (type === 'function') {
    return 'function';
  }

  if (type === 'array') {
    return (actual ? 'different ' : '') + 'array of ' + value.length + ' items';
  }

  if (type === 'string') {
    return (
      (actual ? 'different ' : '') + 'string of ' + value.length + ' chars'
    );
  }

  if (type === 'object') {
    return (actual ? 'different ' : '') + 'object';
  }

  const digits = value.toString().replace(/[^0-9]/g, '').length;
  return (actual ? 'different ' : '') + `${digits} digit number`;
};

process.on('message', (entry: VerifyJob) => {
  const error = (expected: any, actual: any) => {
    const expectedError = formatTypeAndValue(expected, false);
    const actualError = formatTypeAndValue(actual, true);

    return process.send?.({
      err: 'expected ' + expectedError + ', got ' + actualError,
      valid: false,
    });
  };

  const generalError = (err: string) => {
    return process.send?.({
      err,
      valid: false,
    });
  };

  const ruleActive = (entry: VerifyJob, rule: Rule): boolean => {
    return entry.rules.indexOf(rule) !== -1;
  };

  try {
    const script = readFileSync(entry.file, 'utf8');

    let header = '"use strict";\n';

    if (ruleActive(entry, 'no-sort')) {
      header += 'Array.prototype.sort = function() { throw true; };\n';
    }

    if (ruleActive(entry, 'no-add') && script.indexOf('+') !== -1) {
      return generalError('The plus operator is forbidden');
    }

    if (ruleActive(entry, 'no-eval')) {
      global.eval = undefined;

      if (script.indexOf('eval') !== -1) {
        return generalError("Nice try but I'm not letting you use eval...");
      }
    }

    runInNewContext(header + script, global);

    const play = global.module.exports;

    if (typeof play !== 'function') {
      return process.send?.({
        err: 'module.exports is not a function – make sure you assign your function to module.exports',
        valid: false,
      });
    }

    const isObject = (value: any): boolean => {
      return (
        value !== null && !Array.isArray(value) && typeof value === 'object'
      );
    };

    const actualOutput = play(entry.input);
    const expectedOutput = entry.output;

    if (Array.isArray(actualOutput) && Array.isArray(expectedOutput)) {
      if (actualOutput.toString() !== expectedOutput.toString()) {
        return error(expectedOutput, actualOutput);
      }
    } else if (isObject(actualOutput) && isObject(expectedOutput)) {
      if (!lodash.isEqual(actualOutput, expectedOutput)) {
        return error(expectedOutput, actualOutput);
      }
    } else if (actualOutput !== expectedOutput) {
      return error(expectedOutput, actualOutput);
    }

    process.send?.({ valid: true });
  } catch (err) {
    console.error('verifier failed with error:', err);

    process.send?.({
      err: 'Your script contains an error',
      valid: false,
    });
  }
});
