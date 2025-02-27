import { TransactionProcessor } from "./transaction-processor-factory";
import { CreditTransaction } from "../models/transaction";
import { UserBalanceManager } from "../../user/managers";
import { UserBalance } from "../../user/models";

export class CreditTransactionProcessor implements TransactionProcessor {
  constructor(private readonly userBalanceManager: UserBalanceManager) {}

  async process(
    transaction: CreditTransaction,
    userBalance: UserBalance
  ): Promise<UserBalance> {
    await this.userBalanceManager.incrementBalance(
      transaction.userId,
      transaction.amount
    );
    //send events
    return {
      userId: transaction.userId,
      currencyCode: transaction.currencyCode,
      balance: userBalance.balance + transaction.amount,
    };
  }
}
