#!/usr/bin/env node

import 'dotenv/config';
import {getDash} from './model/dashModel';
import {execDash} from './services/dashService';
import axios from 'axios';
import config from './config';

const baseURL = config.BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
});

const args = process.argv.slice(2);

const exec = async () => {
  try {
    const dash = await getDash(args[0]);
    execDash(dash, args.slice(1));
  } catch (err) {
    console.log(err);
  }
};

exec();