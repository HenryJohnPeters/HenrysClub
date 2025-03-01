import { UserBalanceRepository } from "../repositories";
import { UserBalance } from "../models";
import dotenv from "dotenv";
dotenv.config();

const DEFAULT_USER_BALANCE = parseInt(
  process.env.DEFAULT_USER_BALANCE || "100",
  10
);

export class UserBalanceManager {
  constructor(private repo: UserBalanceRepository) {}

  public async get(userId: number): Promise<UserBalance | undefined> {
    return this.repo.get(userId);
  }

  public async add(
    userId: number,
    balance: number = DEFAULT_USER_BALANCE
  ): Promise<UserBalance | undefined> {
    await this.repo.add(userId, balance);
    return await this.get(userId);
  }

  public async incrementBalance(userId: number, amount: number): Promise<void> {
    return this.repo.incrementBalance(userId, amount);
  }

  public async decrementBalance(userId: number, amount: number): Promise<void> {
    return this.repo.decrementBalance(userId, amount);
  }
}
