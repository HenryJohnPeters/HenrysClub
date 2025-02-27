import { db } from "../../../config/dynamodb";
import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import {
  BaseTransaction,
  CreditTransaction,
  DebitTransaction,
} from "../models/transaction";

const TRANSACTIONS_TABLE = process.env.TRANSACTIONS_TABLE || "transactions";

export class TransactionRepository {
  async get(
    userId: number,
    idempotencyId: string
  ): Promise<BaseTransaction | null> {
    const command = new GetCommand({
      TableName: TRANSACTIONS_TABLE,
      Key: {
        userId: userId,
        idempotencyId: idempotencyId,
      },
    });

    const result = await db.send(command);
    return (result.Item as BaseTransaction) || null;
  }

  async getByIdempotencyId(
    idempotencyId: string
  ): Promise<BaseTransaction | undefined> {
    const command = new QueryCommand({
      TableName: TRANSACTIONS_TABLE,
      IndexName: "idempotencyId-index",
      KeyConditionExpression: "idempotencyId = :idempotencyId",
      ExpressionAttributeValues: {
        ":idempotencyId": idempotencyId,
      },
    });

    const result = await db.send(command);
    return result.Items && result.Items.length > 0
      ? (result.Items[0] as BaseTransaction)
      : undefined;
  }

  async add(
    transaction: DebitTransaction | CreditTransaction
  ): Promise<BaseTransaction> {
    const command = new PutCommand({
      TableName: TRANSACTIONS_TABLE,
      Item: transaction,
    });
    await db.send(command);
    return transaction;
  }
}
