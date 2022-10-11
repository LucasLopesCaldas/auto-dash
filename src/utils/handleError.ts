import {AxiosError} from 'axios';
import strings from '../strings';
import {LogColors} from './LogColors';
import log from './log';

export default (err: Error) => {
  switch ((err as AxiosError).response?.status) {
    case 404:
      log(strings.text_task_not_found, LogColors.Bright);
      break;
    case undefined:
      log(strings.internal_error, LogColors.FgRed, LogColors.Bright);
      break;
  }
};
