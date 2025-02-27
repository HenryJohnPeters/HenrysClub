import { UserBalanceRepository } from "../repositories";
import { UserBalance } from "../models";

export class UserBalanceManager {
  private repo: UserBalanceRepository;

  constructor() {
    this.repo = new UserBalanceRepository();
  }

  public async get(userId: number): Promise<UserBalance | undefined> {
    // Could cache
    return this.repo.get(userId);
  }

  public async add(userId: number, amount: number): Promise<void> {
    await this.repo.add(userId, amount);
  }

  public async incrementBalance(userId: number, amount: number): Promise<void> {
    return this.repo.incrementBalance(userId, amount);
  }

  public async decrementBalance(userId: number, amount: number): Promise<void> {
    return this.repo.decrementBalance(userId, amount);
  }
}
