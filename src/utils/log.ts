import {Color} from './Color';

export default (text: unknown, ...colors: Color[]) => {
  console.log(
    `${colors.toString().replace(/,/g, '') || Color.Reset}${text}${Color.Reset}`
  );
};
