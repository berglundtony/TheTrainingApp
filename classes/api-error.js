import { missingCustomMessage } from "@/constants";

export default class ApiError {
  _show404 = false;
  _showCustom = false;
  _message = null;
  _statusCode; // Will be set in constructor

  constructor(statusCode) {
    this.statusCode = statusCode; // Explicitly assign public property
    this._statusCode = statusCode;
    if (statusCode === 404) {
      this._show404 = true;
    }
  }

  get show404() {
    return this._show404;
  }

  get showCustom() {
    return this._showCustom;
  }

  get message() {
    return this._message;
  }

  get status_code() {
    return this._statusCode;
  }

  setCustomMessage(message) {
    if (!message) {
      throw new Error(missingCustomMessage);
    }
    this._message = message;
    this._showCustom = true;
    this._show404 = false;
  }

  static fromError(statusCode, message) {
    const error = new ApiError(statusCode);
    if (message) {
      error.setCustomMessage(message);
    }
    return error;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      show404: this.show404 ?? false,
      status_code: this.status_code,
      showCustom: this.showCustom,
    };
  }
}
