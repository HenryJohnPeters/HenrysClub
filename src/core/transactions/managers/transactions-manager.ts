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
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_USER_BALANCE = parseInt(
  process.env.DEFAULT_USER_BALANCE || "100",
  10
);

export class TransactionManager {
  constructor(
    private readonly userManager: UserManager,
    private readonly userBalanceManager: UserBalanceManager,
    private readonly transactionRepository: TransactionRepository
  ) {}

  public async credit(transaction: CreditTransaction): Promise<UserBalance> {
    return this.processTransaction(transaction, TransactionType.CREDIT);
  }

  public async debit(transaction: DebitTransaction): Promise<UserBalance> {
    return this.processTransaction(transaction, TransactionType.DEBIT);
  }

  private async processTransaction(
    transaction: CreditTransaction | DebitTransaction,
    type: TransactionType
  ): Promise<UserBalance> {
    const { userId, idempotencyId } = transaction;

    const user = await this.userManager.get(userId);
    if (!user) throw new Error(`User not found: ${userId}`);

    const existingTx = await this.getByIdempotencyId(idempotencyId);
    if (existingTx) {
      throw new Error(
        `Transaction with idempotencyId ${idempotencyId} already exists`
      );
    }

    let userBalance = await this.userBalanceManager.get(userId);
    if (!userBalance) {
      await this.userBalanceManager.add(userId, DEFAULT_USER_BALANCE);
      userBalance = await this.userBalanceManager.get(userId);
      if (!userBalance)
        throw new Error(`Failed to create balance for user ${userId}`);
    }

    const processorFactory = new TransactionProcessorFactory(
      this.userBalanceManager
    );
    await processorFactory.getProcessor(type).process(transaction, userBalance);

    await this.add(transaction);

    const updatedBalance = await this.userBalanceManager.get(userId);
    if (!updatedBalance)
      throw new Error(`Balance update failed for user ${userId}`);

    return updatedBalance;
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
