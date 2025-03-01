import { z } from "zod";
import { TransactionType } from "../models";

const baseTransactionSchema = z.object({
  userId: z.number().positive(),
  idempotencyId: z.string().min(1),
  currencyCode: z.string().default("USD"),
  type: z.nativeEnum(TransactionType),
  amount: z.number().positive(),
});

const creditTransactionSchema = baseTransactionSchema.extend({
  type: z.literal(TransactionType.CREDIT),
});

const debitTransactionSchema = baseTransactionSchema.extend({
  type: z.literal(TransactionType.DEBIT),
});

export const transactionSchema = z.discriminatedUnion("type", [
  creditTransactionSchema,
  debitTransactionSchema,
]);

export type BaseTransaction = z.infer<typeof baseTransactionSchema>;
export type CreditTransaction = z.infer<typeof creditTransactionSchema>;
export type DebitTransaction = z.infer<typeof debitTransactionSchema>;
