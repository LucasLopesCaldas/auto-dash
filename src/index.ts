#!/usr/bin/env node

import {getDash} from './model/DashModel';
import {execDash, listDeshes} from './services/DashService';
import axios, {AxiosError} from 'axios';
import config from './config';
import handleError from './utils/handleError';
import log from './utils/log';
import {Color} from './utils/Color';

const baseURL = config.BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
});

const exec = async () => {
  try {
    const dash = await getDash(args[0]);
    execDash(dash, args.slice(1));
  } catch (err) {
    handleError(err as AxiosError);
  }
};

const args = process.argv.slice(2);

switch (args[0]) {
  case undefined:
    log(
      'Please specify a task: \n npx auto-dash <task> [?args]\n\nTo list all tasks: \n npx auto-dash list',
      Color.Bright
    );
    break;
  case 'list':
    listDeshes().then(dashes =>
      dashes.forEach((dash: {name: string}) => {
        log(dash);
      })
    );
    break;
  default:
    exec();
}
