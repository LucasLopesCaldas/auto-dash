import {AxiosError} from 'axios';
import {Color} from './Color';
import log from './log';

export default (err: AxiosError) => {
  if (err.isAxiosError) {
    switch (err.response?.status) {
      case 404:
        log(
          'Task not found\n\nTo list all tasks: \n npx auto-dash list',
          Color.Bright
        );
    }
  }
};
