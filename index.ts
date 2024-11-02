import { Container, ContainerModule, interfaces } from "inversify";
import "reflect-metadata";
import { HttpService } from "./src/HttpService/models/http.model";
import { AxiosHttpService } from "./src/HttpService/services/axios-http.service";
import { FetchHttpService } from "./src/HttpService/services/fetch-http.service";
import { IoCKeys } from "./src/IoCKeys";
import { LoggerService } from "./src/LoggerService/models/logger.model";
import { ConsoleLoggerService } from "./src/LoggerService/services/console-logger.service";
import { Post } from "./src/posts/posts.model";
const httpContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<HttpService>(IoCKeys.FetchHttpService)
    .to(FetchHttpService)
    .inSingletonScope();

  bind<HttpService>(IoCKeys.AxiosHttpService)
    .to(AxiosHttpService)
    .inSingletonScope();
});

const loggerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<LoggerService>(IoCKeys.ConsoleLoggerService)
    .to(ConsoleLoggerService)
    .inSingletonScope();
});

const container = new Container();

container.load(httpContainerModule, loggerModule);

const axiosHttpService = container.get<HttpService>(IoCKeys.AxiosHttpService);
const fetchHttpService = container.get<HttpService>(IoCKeys.FetchHttpService);
const logger = container.get<LoggerService>(IoCKeys.ConsoleLoggerService);

const posts = (async () => {
  return await axiosHttpService.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
})();

const post = (async () => {
  return await axiosHttpService.post<Post>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      title: "foo",
      body: "bar",
      userId: 1,
    }
  );
})();

const posts2 = (async () => {
  return await fetchHttpService.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
})();

const post2 = (async () => {
  return await fetchHttpService.post<Post>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      title: "foo",
      body: "bar",
      userId: 1,
    }
  );
})();

logger.log("axios posts: ", posts);
logger.log("fetch posts: ", posts2);
