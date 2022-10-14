import strings from '../strings';
import {LogColors} from './LogColors';
import log from './log';
import CustomError from '../types/CustomError';

export default (err: Error) => {
  log(err);

  if ((err as CustomError).isCustomError) return log(err.message);

  log(strings.internal_error, LogColors.FgRed, LogColors.Bright);
};
