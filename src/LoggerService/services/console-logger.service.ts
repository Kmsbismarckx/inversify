import { injectable } from "inversify";
import { LoggerService } from "../models/logger.model";
@injectable()
export class ConsoleLoggerService implements LoggerService {
  /**
   * Logs a message to the console.
   *
   * @param {string} message the message to log
   */
  log(message: string, data?: any): void {
    console.log(message, data);
  }
}
