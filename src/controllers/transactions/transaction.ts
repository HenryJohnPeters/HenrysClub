import { Request, Response } from "express";
import { TransactionManager } from "../../core/transactions/managers";
import {
  CreditTransaction,
  DebitTransaction,
} from "../../core/transactions/models/transaction";
import { TransactionType } from "../../core/transactions/models";

export class TransactionController {
  constructor(private readonly manager: TransactionManager) {}

  public debit = async (req: Request, res: Response) => {
    try {
      const userBalance = await this.manager.processTransaction(
        req.body as DebitTransaction,
        TransactionType.DEBIT
      );
      res.status(201).json(userBalance);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  public credit = async (req: Request, res: Response) => {
    try {
      const userBalance = await this.manager.processTransaction(
        req.body as CreditTransaction,
        TransactionType.CREDIT
      );
      res.status(201).json(userBalance);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
