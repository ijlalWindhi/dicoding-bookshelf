import Hapi from "@hapi/hapi";
import routes from "./routes.js";

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route(routes);

  await server.start();
  console.log(`⚡️[server]: Server is running at ${server.info.uri}`);
};

init();
