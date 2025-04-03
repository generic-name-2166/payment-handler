export interface Service {
  processPayment(id: number, amount: number): Promise<boolean>;
}

export class RealService implements Service {
  processPayment(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
