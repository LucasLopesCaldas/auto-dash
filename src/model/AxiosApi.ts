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

  public async get<T>(url: string): Promise<T> {
    const res = await this.axiosInstance.get(url);
    console.log(res);

    const {data} = res;
    return data;
  }
}
