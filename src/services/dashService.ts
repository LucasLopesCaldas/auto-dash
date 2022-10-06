import {getAllDashes} from '../model/dashModel';
import {execCommand} from './shellService';

export const execDash = (dash: string, args?: string[]) => {
  execCommand(dash, args);
};

export const listDeshes = () => {
  return getAllDashes();
};
