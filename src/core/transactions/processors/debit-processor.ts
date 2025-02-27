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
    await this.userBalanceManager.decrementBalance(
      transaction.userId,
      transaction.amount
    );

    // Send events
    return {
      userId: transaction.userId,
      currencyCode: transaction.currencyCode,
      amount: userBalance.amount - transaction.amount,
    };
  }
}
