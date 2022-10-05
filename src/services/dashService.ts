import {execCommand} from './shellService';

export const execDash = (dash: string, args?: string[]) => {
  execCommand(dash, args);
};
