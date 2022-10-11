import IApi from '../types/IApi';
import {DashResponse} from '../types/RsponseTypes';
import {decodeBase64} from '../utils/base64';

export default class DashModel {
  constructor(private api: IApi) {}

  public async getDash(dashName: string) {
    const data = await this.api.get<DashResponse>(`${dashName}.sh`);
    return decodeBase64(data.content);
  }

  public async listAllDashes() {
    const data = await this.api.get<DashResponse[]>('');
    return data.map((dash: {name: string}) => dash.name.replace('.sh', ''));
  }
}
