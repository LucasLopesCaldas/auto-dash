import {Stream} from 'stream';
import {spawn} from 'child_process';
import {existsSync, unlinkSync, writeFileSync} from 'fs';
import log from '../utils/log';
import strings from '../strings';
import config from '../Config';

export default class ShellService {
  constructor() {}

  public exec(
    command: string,
    args: string[],
    callback?: (err?: Error) => void
  ) {
    const proc = spawn(command, args, {stdio: 'inherit'});

    proc.stdout?.on('data', (data: Stream) => {
      log(data.toString());
    });

    proc.stderr?.on('data', (data: Stream) => {
      log(data.toString());
    });

    proc.on('error', (error: Error) => {
      log(error);
      log('\n');
      if (callback) callback(error);
    });

    proc.on('close', () => {
      if (callback) callback(undefined);
    });
  }

  public execCommand(command: string, args?: string[]) {
    const commandFile = `${config.TEMP_FOLDER}${strings.temp_command_file_name}`;
    writeFileSync(commandFile, command);

    this.exec('chmod', ['+x', commandFile], () => {
      this.exec(commandFile, args || [], () => {
        if (existsSync(commandFile)) unlinkSync(commandFile);
      });
    });
  }
}
