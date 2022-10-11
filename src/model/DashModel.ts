import {axiosInstance} from '..';
import {decodeBase64} from '../utils/base64';

export default class DashModel {
  constructor() {}

  public async getDash(dashName: string) {
    const {data} = await axiosInstance.get(`${dashName}.sh`);
    return decodeBase64(data.content);
  }

  public async listAllDashes() {
    const {data} = await axiosInstance.get('');
    return data.map((dash: {name: string}) => dash.name.replace('.sh', ''));
  }
}
