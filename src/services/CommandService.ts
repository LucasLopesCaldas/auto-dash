import {existsSync, lstatSync, writeFileSync} from 'fs';
import strings from '../strings';
import log from '../utils/log';
import {LogColors} from '../utils/LogColors';
import DashService from './DashService';

export default class CommandService {
  constructor(private dashes: DashService) {}

  public async dash(dash: string, args: string[]) {
    await this.dashes.execDash(dash, args);
  }

  public async list() {
    const dashes = await this.dashes.getAllDashes();

    dashes.forEach((dashName: string) => {
      log(dashName, LogColors.FgGreen, LogColors.Bright);
    });
  }

  public local(path: string, args: string[]) {
    let filePath: string;

    if (existsSync(path) && lstatSync(path).isDirectory()) {
      filePath = `${path}${!path.endsWith('/') ? '/' : ''}index.sh`;
    } else {
      filePath = path;
    }

    if (!existsSync(filePath)) {
      return log(`${strings.not_found}: ${filePath}`, LogColors.Bright);
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
