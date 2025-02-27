import { db } from "../../../config/dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "../models/user";

const USERS_TABLE = process.env.USERS_TABLE || "users";

export class UserRepository {
  async get(id: number): Promise<User | undefined> {
    try {
      const command = new GetCommand({
        TableName: USERS_TABLE,
        Key: { id: Number(id) },
      });

      const result = await db.send(command);
      return (result.Item as User) || null;
    } catch (error: unknown) {
      const errMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error getting user:", errMessage);
      throw new Error(`Error getting user: ${errMessage}`);
    }
  }
}
