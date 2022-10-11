import IApi from '../types/IApi';

export default class Api implements IApi {
  public async get(): Promise<Object> {
    return new Object();
  }
}
