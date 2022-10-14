import {AxiosError} from 'axios';
import strings from '../strings';
import {LogColors} from './LogColors';
import log from './log';
import CustomError from '../types/CustomError';

export default (err: Error) => {
  log(err);
  if ((err as AxiosError).isAxiosError)
    return handleAxiosError(err as AxiosError);

  if ((err as CustomError).isCustomError)
    return handleCustomError(err as CustomError);

  log(strings.internal_error, LogColors.FgRed, LogColors.Bright);
};

const handleCustomError = (err: CustomError) => {
  log(err.message);
};

const handleAxiosError = (err: AxiosError) => {
  switch (err.response?.status) {
    case 404:
      log(strings.text_task_not_found, LogColors.Bright);
      break;
    default:
      log(strings.internal_error, LogColors.FgRed, LogColors.Bright);
      break;
  }
};
