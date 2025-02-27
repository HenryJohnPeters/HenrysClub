import { TransactionRepository } from "../repositories";
import { UserBalanceManager, UserManager } from "../../user/managers";
import {
  BaseTransaction,
  CreditTransaction,
  DebitTransaction,
} from "../models/transaction";
import { TransactionProcessorFactory } from "../processors/transaction-processor-factory";
import { TransactionType } from "../models/transaction-type";
import { UserBalance } from "../../user/models";

export class TransactionManager {
  constructor(
    private readonly userManager: UserManager,
    private readonly userBalanceManager: UserBalanceManager,
    private readonly transactionRepository: TransactionRepository
  ) {}

  public async processTransaction(
    transaction: CreditTransaction | DebitTransaction,
    type: TransactionType
  ): Promise<UserBalance> {
    const { userId, idempotencyId } = transaction;

    const user = await this.userManager.get(userId);
    if (!user) throw new Error(`User not found: ${userId}`);

    const existingTx = await this.getByIdempotencyId(idempotencyId);
    if (existingTx)
      throw new Error(
        `Transaction with idempotencyId ${idempotencyId} already exists`
      );

    let userBalance = await this.userBalanceManager.get(userId);
    if (!userBalance) {
      userBalance = await this.userBalanceManager.add(userId);
      if (!userBalance)
        throw new Error(`Failed to create balance for user ${userId}`);
    }

    const processor = new TransactionProcessorFactory(
      this.userBalanceManager
    ).getProcessor(type);
    await this.add(transaction);
    return await processor.process(transaction, userBalance);
  }

  public async getByIdempotencyId(
    id: string
  ): Promise<BaseTransaction | undefined> {
    return this.transactionRepository.getByIdempotencyId(id);
  }

  public async add(
    transaction: CreditTransaction | DebitTransaction
  ): Promise<BaseTransaction> {
    return this.transactionRepository.add(transaction);
  }
}
