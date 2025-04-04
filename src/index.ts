import initialize from "./app.ts";
import { migrator } from "./data-source.ts";
import { RealService, type Service } from "./services/service.ts";

const service: Service = new RealService();
const port = 3000;

const app = initialize(service);
// await migrator.down();
await migrator.up();

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

server.on("error", console.error);
