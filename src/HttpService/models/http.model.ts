export abstract class HttpService {
  abstract get<T>(url: string, params?: any): Promise<T>;
  abstract post<T>(url: string, params?: any): Promise<T>;
}
