import express, { type Request, type Response, type Router } from "express";
import { matchedData, validationResult } from "express-validator";
import type { Service } from "../services/service.ts";
import validate from "../middleware/payment.validate.ts";

async function postPayment(
  req: Request,
  res: Response,
  service: Service,
): Promise<void> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
    return;
  }

  const data = matchedData(req);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id: number = data.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const amount: number = data.amount;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (await service.processPayment(id, amount))
    ? res.sendStatus(201)
    : res.sendStatus(402);
}

export default function payment(service: Service): Router {
  const router: Router = express.Router();

  const post = (req: Request, res: Response) => postPayment(req, res, service);

  router.post("/", validate, post);

  return router;
}
