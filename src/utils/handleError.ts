import strings from '../strings';
import {LogColors} from './LogColors';
import log from './log';
import CustomError from '../types/CustomError';

export default (err: Error) => {
  if ((err as CustomError).isCustomError)
    return log(err.message, ...(err as CustomError).messageColors);

  log(strings.internal_error, LogColors.FgRed, LogColors.Bright);
};
