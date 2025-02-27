import { db } from "../../../config/dynamodb";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { UserBalance } from "../models";

const USER_BALANCES_TABLE = process.env.USER_BALANCES_TABLE || "user_balances";

export class UserBalanceRepository {
  async get(
    userId: number,
    currencyCode: string = "USD"
  ): Promise<UserBalance | undefined> {
    try {
      const command = new GetCommand({
        TableName: USER_BALANCES_TABLE,
        Key: {
          userId: Number(userId),
          currencyCode: currencyCode,
        },
      });
      const result = await db.send(command);
      return result.Item as UserBalance | undefined;
    } catch (error) {
      throw new Error(`Error getting user balance: ${JSON.stringify(error)}`);
    }
  }

  async add(
    userId: number,
    balance: number,
    currencyCode: string = "USD"
  ): Promise<void> {
    try {
      const command = new PutCommand({
        TableName: USER_BALANCES_TABLE,
        Item: {
          userId: userId,
          currencyCode: currencyCode,
          balance,
        },
        ConditionExpression:
          "attribute_not_exists(userId) AND attribute_not_exists(currencyCode)",
      });

      await db.send(command);
    } catch (error: any) {
      throw new Error(`Error creating user balance: ${JSON.stringify(error)}`);
    }
  }

  async incrementBalance(
    userId: number,
    amount: number,
    currencyCode: string = "USD"
  ): Promise<void> {
    try {
      const command = new UpdateCommand({
        TableName: USER_BALANCES_TABLE,
        Key: {
          userId: userId,
          currencyCode: currencyCode,
        },
        UpdateExpression: "SET balance = balance + :amt",
        ConditionExpression:
          "attribute_exists(userId) AND attribute_exists(currencyCode)",
        ExpressionAttributeValues: {
          ":amt": amount,
        },
      });

      await db.send(command);
    } catch (error: any) {
      throw new Error(
        `Error incrementing user balance: ${JSON.stringify(error)}`
      );
    }
  }

  async decrementBalance(
    userId: number,
    amount: number,
    currencyCode: string = "USD"
  ): Promise<void> {
    try {
      const command = new UpdateCommand({
        TableName: USER_BALANCES_TABLE,
        Key: {
          userId: userId,
          currencyCode: currencyCode,
        },
        UpdateExpression: "SET balance = balance - :amt",
        ConditionExpression:
          "attribute_exists(userId) AND attribute_exists(currencyCode) AND balance >= :amt",
        ExpressionAttributeValues: {
          ":amt": amount,
        },
      });

      await db.send(command);
    } catch (error: any) {
      throw new Error(
        `Error decrementing user balance: ${JSON.stringify(error)}`
      );
    }
  }
}
