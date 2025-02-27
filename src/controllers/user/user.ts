import { Request, Response } from "express";
import { UserBalanceManager } from "../../core/user/managers";

export class UserController {
  constructor(private readonly balanceManager: UserBalanceManager) {}

  public getBalance = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const balance = await this.balanceManager.get(req.params.id);
      if (!balance) throw new Error("Balance not found");
      res.status(200).json(balance);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
