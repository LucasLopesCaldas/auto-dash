import {LogColors} from '../utils/LogColors';

export default class CustomError extends Error {
  public isCustomError = true;
  public messageColors: LogColors[];
  constructor(message: string, ...messageColors: LogColors[]) {
    super(message);
    this.messageColors = messageColors;
  }
}
