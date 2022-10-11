import DashModel from '../model/DashModel';
import ShellService from './ShellService';

export default class DashService {
  constructor(private dashes: DashModel, private shell: ShellService) {}

  public async execDash(dashName: string, args?: string[]) {
    const dash = await this.dashes.getDash(dashName);
    this.shell.execCommand(dash, args);
  }

  public listDeshes() {
    return this.dashes.listAllDashes();
  }
}
