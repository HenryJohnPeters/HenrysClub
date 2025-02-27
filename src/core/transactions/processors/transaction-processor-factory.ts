import { UserBalance } from "../../user/models";
import { CreditTransaction, DebitTransaction } from "../models/transaction";
import { TransactionType } from "../models/transaction-type";
import { CreditTransactionProcessor } from "./credit-processor";
import { DebitTransactionProcessor } from "./debit-processor";
import { UserBalanceManager } from "../../user/managers";

export interface TransactionProcessor {
  process(
    transaction: CreditTransaction | DebitTransaction,
    userBalance: UserBalance
  ): Promise<UserBalance>;
}

export class TransactionProcessorFactory {
  constructor(private readonly userBalanceManager: UserBalanceManager) {}

  public getProcessor(type: TransactionType): TransactionProcessor {
    switch (type) {
      case TransactionType.CREDIT:
        return new CreditTransactionProcessor(this.userBalanceManager);
      case TransactionType.DEBIT:
        return new DebitTransactionProcessor(this.userBalanceManager);
      default:
        throw new Error(`Invalid transaction type: ${type}`);
    }
  }
}
