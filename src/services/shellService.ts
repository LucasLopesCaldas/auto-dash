import {Stream} from 'stream';
import {spawn} from 'child_process';
import {unlinkSync, writeFileSync} from 'fs';

const exec = (
  command: string,
  args: string[],
  callback?: (err?: Error) => void
) => {
  const proc = spawn(command, args, {stdio: 'inherit'});

  proc.stdout?.on('data', (data: Stream) => {
    console.log(data.toString());
  });

  proc.stderr?.on('data', (data: Stream) => {
    console.log(data.toString());
  });

  proc.on('error', (error: Error) => {
    console.log(error);
    console.log('\n');
    if (callback) callback(error);
  });

  proc.on('close', () => {
    if (callback) callback(undefined);
  });
};

export const execCommand = (command: string, args?: string[]) => {
  writeFileSync('command.sh', command);

  exec('chmod', ['+x', 'command.sh'], () => {
    exec('./command.sh', args || [], () => {
      unlinkSync('command.sh');
    });
  });
};
