class ErrorHandler {
  constructor(error = false, message = '') {
    this.error = error;
    this.message = message;
  }

  setError(message) {
    this.error = true;
    this.message = message;
  }

  reset() {
    this.error = false;
    this.message = '';
  }
}

module.exports = ErrorHandler
