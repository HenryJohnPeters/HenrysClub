import { Request, Response } from "express";
import { UserBalanceManager, UserManager } from "../../core/user/managers";

export class UserController {
  constructor(
    private readonly balanceManager: UserBalanceManager,
    private readonly userManager: UserManager
  ) {}
  public getBalance = async (
    req: Request<{ userId: string }>,
    res: Response
  ) => {
    try {
      const userId = Number(req.params.userId);
      const user = await this.userManager.get(userId);
      if (!user) throw new Error("User Not Found");
      let balance = await this.balanceManager.get(userId);
      if (!balance) balance = await this.balanceManager.add(userId);
      res.status(200).json(balance);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
