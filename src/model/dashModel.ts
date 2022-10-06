import {axiosInstance} from '..';
import {decodeBase64} from '../utils/base64';

export const getDash = async (dashName: string) => {
  const {data} = await axiosInstance.get(`${dashName}.sh`);
  return decodeBase64(data.content);
};

export const listAllDashes = async () => {
  const {data} = await axiosInstance.get('');
  return data.map((dash: {name: string}) => dash.name.replace('.sh', ''));
};
