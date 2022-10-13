import {existsSync} from 'fs';
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
    if (!existsSync(path)) {
      return log(`${strings.not_found}: ${path}`, LogColors.Bright);
    }
    this.dashes.execLocalDash(path, args);
  }
}
