import express, { type Request, type Response, type Router } from "express";
import { matchedData, validationResult } from "express-validator";
import { PaymentResult, type Service } from "../services/service.ts";
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

  const result = await service.processPayment(id, amount);
  switch (result) {
    case PaymentResult.NotFound:
      res.sendStatus(404);
      return;
    case PaymentResult.Success:
      res.sendStatus(201);
      return;
    case PaymentResult.Failure:
      res.sendStatus(402);
      return;
  }
}

export default function payment(service: Service): Router {
  const router: Router = express.Router();

  const post = (req: Request, res: Response) => postPayment(req, res, service);

  router.post("/", validate, post);

  return router;
}
