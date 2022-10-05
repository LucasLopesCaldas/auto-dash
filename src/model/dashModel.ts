import {axiosInstance} from '..';
import {decodeBase64} from '../utils/base64';

export const getDash = async (dashName: string) => {
  const {data} = await axiosInstance.get(`${dashName}.sh`);
  return decodeBase64(data.content);
};
