import DashModel from '../model/DashModel';
import ShellService from './ShellService';

export default class DashService {
  constructor(private dashes: DashModel, private shell: ShellService) {}

  public execDash(dash: string, args?: string[]) {
    this.shell.execCommand(dash, args);
  }

  public listDeshes() {
    return this.dashes.listAllDashes();
  }
}
