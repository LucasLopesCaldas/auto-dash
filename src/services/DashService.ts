import {existsSync, readFileSync} from 'fs';
import DashModel from '../model/DashModel';
import strings from '../strings';
import CustomError from '../types/CustomError';
import {LogColors} from '../utils/LogColors';
import ShellService from './ShellService';

export default class DashService {
  constructor(private dashes: DashModel, private shell: ShellService) {}

  public async execDash(dashName: string, args?: string[]) {
    const dash = await this.dashes.getDash(dashName);
    if (!dash)
      throw new CustomError(strings.text_task_not_found, LogColors.Bright);
    this.shell.execCommand(dash, args);
  }

  public execLocalDash(path: string, args?: string[]) {
    if (!existsSync(path))
      throw new CustomError(
        `${strings.text_local_task_not_found}: ${path}`,
        LogColors.Bright
      );

    const dash = readFileSync(path).toString();
    this.shell.execCommand(dash, args);
  }

  public getAllDashes() {
    return this.dashes.getAllDashes();
  }

  public async getFile(path: string) {
    const file = await this.dashes.getFile(path);
    if (!file)
      throw new CustomError(`${strings.not_found}: ${path}`, LogColors.Bright);
    return file;
  }
}
