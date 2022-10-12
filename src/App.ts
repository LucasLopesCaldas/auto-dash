import AxiosApi from './model/AxiosApi';
import DashModel from './model/DashModel';
import DashService from './services/DashService';
import ShellService from './services/ShellService';
import strings from './strings';
import {LogColors} from './utils/LogColors';
import log from './utils/log';
import CommandService from './services/CommandService';

export default class App {
  private commands: CommandService;

  constructor(baseURL: string) {
    this.commands = new CommandService(
      new DashService(new DashModel(new AxiosApi(baseURL)), new ShellService())
    );
  }

  public async execute(command: string, args: string[]) {
    switch (command) {
      case undefined:
        log(strings.text_specify_task, LogColors.Bright);
        break;

      case 'list':
        this.commands.list();
        break;

      case 'local':
        this.commands.local(args[0], args.slice(1));
        break;

      default:
        await this.commands.dash(command, args);
        break;
    }
  }
}
