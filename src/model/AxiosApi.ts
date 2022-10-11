import axios, {Axios} from 'axios';
import IApi from '../types/IApi';

export default class AxiosApi implements IApi {
  private axiosInstance: Axios;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  public async get<T>(url: string): Promise<T> {
    const {data} = await this.axiosInstance.get(url);
    return data;
  }
}
