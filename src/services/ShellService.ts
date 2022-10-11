import {Stream} from 'stream';
import {spawn} from 'child_process';
import {unlinkSync, writeFileSync} from 'fs';
import log from '../utils/log';

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
    writeFileSync('command.sh', command);

    this.exec('chmod', ['+x', 'command.sh'], () => {
      this.exec('./command.sh', args || [], () => {
        unlinkSync('command.sh');
      });
    });
  }
}
