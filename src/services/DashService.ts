import {readFileSync} from 'fs';
import DashModel from '../model/DashModel';
import ShellService from './ShellService';

export default class DashService {
  constructor(private dashes: DashModel, private shell: ShellService) {}

  public async execDash(dashName: string, args?: string[]) {
    const dash = await this.dashes.getDash(dashName);
    this.shell.execCommand(dash, args);
  }

  public async execLocalDash(path: string, args?: string[]) {
    const dash = readFileSync(path).toString();
    this.shell.execCommand(dash, args);
  }

  public listDeshes() {
    return this.dashes.listAllDashes();
  }
}
