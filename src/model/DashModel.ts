import IApi from '../types/IApi';
import {DashResponse} from '../types/RsponseTypes';
import {decodeBase64} from '../utils/base64';

export default class DashModel {
  constructor(private api: IApi) {}

  public async getDash(dashName: string) {
    const data = await this.api.get<DashResponse>(`${dashName}/index.sh`);
    return decodeBase64(data.content);
  }

  public async getFile(filePath: string) {
    const data = await this.api.get<DashResponse>(filePath);
    return decodeBase64(data.content);
  }

  public async getAllDashes() {
    const data = await this.api.get<DashResponse[]>('');
    return data.map((dash: {name: string}) => dash.name);
  }
}
