export class UnauthorizedError extends Error {
  constructor() {
    super('Email address or password provided is incorrect.');
  }
}
