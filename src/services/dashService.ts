import DashModel from '../model/DashModel';
import {execCommand} from './shellService';

export default class DashService {
  constructor(private dashes: DashModel) {}

  public execDash(dash: string, args?: string[]) {
    execCommand(dash, args);
  }

  public listDeshes() {
    return this.dashes.listAllDashes();
  }
}
