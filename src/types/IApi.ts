export default interface IApi {
  get: <T>(url: string) => Promise<T>;
}
