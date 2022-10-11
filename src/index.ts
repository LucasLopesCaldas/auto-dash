#!/usr/bin/env node

import config from './config';
import App from './App';
import handleError from './utils/handleError';

const baseURL = config.BASE_URL;

const args = process.argv.slice(2);

const app = new App(baseURL);
app.execute(args[0], args.slice(1)).catch(err => {
  handleError(err);
});
/*





















/*const exec = async () => {
  try {

  } catch (err) {
    handleError(err as AxiosError);
  }
};*/

/*switch (args[0]) {

  case 'list':

  default:
    exec();
}*/
