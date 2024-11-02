import { injectable } from "inversify";
import { HttpService } from "../models/http.model";
@injectable()
export class FetchHttpService implements HttpService {
  /**
   * Send a GET request to the server.
   *
   * @template T type of the response data
   * @template U type of the request parameters
   * @param {string} url the request URL
   * @param {RequestInit} params the request parameters
   * @returns {Promise<T>} the response
   */
  get<T, U>(url: string, params: RequestInit): Promise<T> {
    return fetch(url, { method: "GET", ...params }).then((response) =>
      response.json()
    );
  }
  /**
   * Send a POST request to the server.
   *
   * @template T type of the response data
   * @param {string} url the request URL
   * @param {RequestInit} params the request parameters
   * @returns {Promise<T>} the response
   */
  post<T>(url: string, params: RequestInit): Promise<T> {
    return fetch(url, { method: "POST", ...params }).then((response) =>
      response.json()
    );
  }
}
