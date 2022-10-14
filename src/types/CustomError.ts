export default class CustomError extends Error {
  public isCustomError = true;
  constructor(public status: number, message: string) {
    super(message);
  }
}
