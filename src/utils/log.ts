import {LogColors} from './LogColors';

export default (text: unknown, ...colors: LogColors[]) => {
  console.log(
    `${colors.toString().replace(/,/g, '') || LogColors.Reset}${text}${
      LogColors.Reset
    }`
  );
};
