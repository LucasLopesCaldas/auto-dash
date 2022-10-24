import {existsSync, lstatSync, writeFileSync} from 'fs';
import prompts = require('prompts');
import strings from '../strings';
import CustomError from '../types/CustomError';
import log from '../utils/log';
import {LogColors} from '../utils/LogColors';
import DashService from './DashService';

export default class CommandService {
  constructor(private dashes: DashService) {}

  public async dash(dash: string, args?: string[]) {
    await this.dashes.execDash(dash, args);
  }

  public async list(args?: string[]) {
    const dashes = await this.dashes.getAllDashes();
    log(dashes?.join('\n'), LogColors.Bright, LogColors.FgGreen)
  }

  public async select(args?: string[]) {
    if (args?.length) {
      await this.dash(args[0], args.slice(1));
      return
    }

    const dashes = await this.dashes.getAllDashes();

    const dash = await prompts({
      type: 'autocomplete',
      message: 'Choose one dash',
      name: 'dash',
      choices: dashes?.map(dash => {
        return {
          title: dash,
        };
      }),
    });

    if (!dash.dash)
      throw new CustomError(strings.cancelled + '!', LogColors.Bright);
    this.dash(dash.dash, args);
  }

  public local(path: string, args: string[]) {
    let filePath: string;

    if (existsSync(path) && lstatSync(path).isDirectory()) {
      filePath = `${path}${!path.endsWith('/') ? '/' : ''}index.sh`;
    } else {
      filePath = path;
    }
    this.dashes.execLocalDash(filePath, args);
  }

  public async get(path: string) {
    const file = await this.dashes.getFile(path);
    const fileName = path.split('/')[path.split('/').length - 1];
    writeFileSync(fileName, file);
    log(fileName, LogColors.Bright);
  }
}
