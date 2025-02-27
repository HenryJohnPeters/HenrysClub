import { UserBalanceManager } from "../../user/managers";
import { UserBalance } from "../../user/models";
import { DebitTransaction } from "../models/transaction";
import { TransactionProcessor } from "./transaction-processor-factory";

export class DebitTransactionProcessor implements TransactionProcessor {
  constructor(private readonly userBalanceManager: UserBalanceManager) {}

  async process(
    transaction: DebitTransaction,
    userBalance: UserBalance
  ): Promise<UserBalance> {
    if (transaction.amount > userBalance.balance)
      throw new Error("Insufficent Funds");

    await this.userBalanceManager.decrementBalance(
      transaction.userId,
      transaction.amount
    );
    // Send events
    return {
      userId: transaction.userId,
      currencyCode: transaction.currencyCode,
      balance: userBalance.balance - transaction.amount,
    };
  }
}
