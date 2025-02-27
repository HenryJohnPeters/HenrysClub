import { Request, Response } from "express";
import { TransactionManager } from "../../core/transactions/managers";
import {
  CreditTransaction,
  DebitTransaction,
} from "../../core/transactions/models/transaction";

export class TransactionController {
  constructor(private readonly manager: TransactionManager) {}

  public debit = async (req: Request, res: Response) => {
    try {
      const usserBalance = await this.manager.debit(
        req.body as DebitTransaction
      );
      res.status(201).json(usserBalance);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  public credit = async (req: Request, res: Response) => {
    try {
      const usserBalance = await this.manager.credit(
        req.body as CreditTransaction
      );
      res.status(201).json(usserBalance);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
