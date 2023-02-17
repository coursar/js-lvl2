const codes = Object.freeze({
  'err.internal': 'Internal Server Error, try again later',
});

const defaultError = 'Unknown Error, reload page and try again later';

export default class ErrorTranslator {
  translate(code) {
    if (codes.hasOwnProperty(code)) {
      return codes[code];
    }
    return defaultError;
  }
};

