import { User } from "../models/user.ts";

export const enum PaymentResult {
  NotFound,
  Success,
  Failure,
}

export interface Service {
  processPayment(id: number, amount: number): Promise<PaymentResult>;
}

export class RealService implements Service {
  async processPayment(id: number, amount: number): Promise<PaymentResult> {
    const user: User | null = await User.findByPk(id);
    if (user === null) {
      return PaymentResult.NotFound;
    }
    const balance = (user.getDataValue("balance") as number) + amount;
    if (balance < 0) {
      return PaymentResult.Failure;
    }
    user.setDataValue("balance", balance);
    await user.save({ fields: ["balance"] });
    return PaymentResult.Success;
  }
}
