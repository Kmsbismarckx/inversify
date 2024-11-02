import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { IoCKeys } from "../../IoCKeys";
import { LoggerService } from "../../LoggerService/models/logger.model";
import { HttpService } from "../models/http.model";
@injectable()
export class AxiosHttpService implements HttpService {
  constructor(
    @inject(IoCKeys.ConsoleLoggerService) private logger: LoggerService
  ) {}
  /**
   * Send a GET request to the server.
   *
   * @template T type of the response data
   * @template U type of the request parameters
   * @param {string} url the request URL
   * @param {AxiosRequestConfig<U>} params the request parameters
   * @returns {Promise<AxiosResponse<T>>} the response
   */
  get<T, U>(url: string, params: AxiosRequestConfig<U>): Promise<T> {
    return axios.get<T>(url, params).then((response) => {
      this.logger.log("get data: ", response.data);
      return response.data;
    });
  }
  /**
   * Send a POST request to the server.
   *
   * @template T type of the request data
   * @param {string} url the request URL
   * @param {T} params the request data
   * @throws {Error} an error is thrown, as the method is not implemented
   */
  post<T>(url: string, params: T): Promise<T> {
    return axios.post(url, params).then((response) => {
      this.logger.log("post data: ", response.data);
      return response.data;
    });
  }
}
