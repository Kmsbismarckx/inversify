export abstract class LoggerService {
  abstract log(message: string, data?: any): void;
}
