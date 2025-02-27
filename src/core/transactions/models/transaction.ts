import { TransactionType } from "./transaction-type";

export class BaseTransaction {
  userId!: number;
  idempotencyId!: string;
  currencyCode: string = "USD";
  type!: TransactionType;
  amount!: number;
}

export interface CreditTransaction extends BaseTransaction {
  type: TransactionType.CREDIT;
}

export interface DebitTransaction extends BaseTransaction {
  type: TransactionType.DEBIT;
}
