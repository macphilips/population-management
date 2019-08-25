export const errors = {
  LOC_02: 'Location doesn\'t exist',
  LOC_03: parentId => `${parentId} doesn't exist`,
};

class HttpError extends Error {
  constructor(code, field, message, statusCode = 500) {
    super();
    this.message = errors[code] || message;
    this.code = code;
    this.field = field;
    if (errors[code] instanceof Function) {
      this.message = errors[code](field) || message;
    }
    this.statusCode = statusCode;
  }
}

export default HttpError;
