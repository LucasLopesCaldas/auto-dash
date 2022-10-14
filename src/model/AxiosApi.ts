import axios, {Axios} from 'axios';
import IApi from '../types/IApi';

export default class AxiosApi implements IApi {
  private axiosInstance: Axios;

  constructor(baseURL: string, baseQuery?: Object) {
    this.axiosInstance = axios.create({
      baseURL,
      params: baseQuery,
    });
  }

  public async get<T>(url: string): Promise<T | undefined> {
    try {
      const {data} = await this.axiosInstance.get(url);
      return data;
    } catch (err) {
      return;
    }
  }
}
