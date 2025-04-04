import express, { type Application } from "express";
import helmet from "helmet";
import payment from "./controllers/payment.ts";
import type { Service } from "./services/service.ts";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

export default function initialize(service: Service): Application {
  const router = express.Router();
  router.use("/payment", payment(service));
  app.use("/", router);

  return app;
}
