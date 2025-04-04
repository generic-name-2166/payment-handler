import { User } from "../models/user.ts";

export const enum PaymentResult {
  NotFound,
  Success,
  Failure,
}

export interface Service {
  processPayment(id: number, amount: bigint): Promise<PaymentResult>;
}

export class RealService implements Service {
  async processPayment(id: number, amount: bigint): Promise<PaymentResult> {
    const user: User | null = await User.findByPk(id);
    if (user === null) {
      return PaymentResult.NotFound;
    }
    // bigint is returned as a string
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const balance = BigInt(user.getDataValue("balance")) + amount;
    if (balance < 0) {
      return PaymentResult.Failure;
    }
    user.setDataValue("balance", balance);
    await user.save({ fields: ["balance"] });
    return PaymentResult.Success;
  }
}
