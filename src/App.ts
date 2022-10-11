import AxiosApi from './model/AxiosApi';
import DashModel from './model/DashModel';
import DashService from './services/DashService';
import ShellService from './services/ShellService';
import strings from './strings';
import {LogColors} from './utils/LogColors';
import log from './utils/log';

export default class App {
  private dashes: DashService;

  constructor(baseURL: string) {
    this.dashes = new DashService(
      new DashModel(new AxiosApi(baseURL)),
      new ShellService()
    );
  }

  public async execute(command: string, args: string[]) {
    switch (command) {
      case undefined:
        log(strings.text_specify_task, LogColors.Bright);
        break;

      case 'list':
        this.dashes.listDeshes().then(dashes =>
          dashes.forEach((dashName: string) => {
            log(dashName, LogColors.FgGreen, LogColors.Bright);
          })
        );
        break;

      default:
        await this.dashes.execDash(command, args);
        break;
    }
  }
}
