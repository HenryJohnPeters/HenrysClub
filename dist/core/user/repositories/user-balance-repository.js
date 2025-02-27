"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBalanceRepository = void 0;
const dynamodb_1 = require("../../../config/dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const USER_BALANCES_TABLE = process.env.USER_BALANCES_TABLE || "user_balances";
class UserBalanceRepository {
    get(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, currencyCode = "USD") {
            try {
                const command = new lib_dynamodb_1.GetCommand({
                    TableName: USER_BALANCES_TABLE,
                    Key: {
                        userId: userId,
                        currencyCode: currencyCode,
                    },
                });
                const result = yield dynamodb_1.db.send(command);
                return result.Item;
            }
            catch (error) {
                throw new Error(`Error getting user balance: ${JSON.stringify(error)}`);
            }
        });
    }
    add(userId_1, amount_1) {
        return __awaiter(this, arguments, void 0, function* (userId, amount, currencyCode = "USD") {
            try {
                const command = new lib_dynamodb_1.PutCommand({
                    TableName: USER_BALANCES_TABLE,
                    Item: {
                        userId: userId,
                        currencyCode: currencyCode,
                        amount: amount,
                    },
                    ConditionExpression: "attribute_not_exists(userId) AND attribute_not_exists(currencyCode)",
                });
                yield dynamodb_1.db.send(command);
            }
            catch (error) {
                if (error.name === "ConditionalCheckFailedException") {
                    throw new Error(`User balance for ${currencyCode} already exists.`);
                }
                throw new Error(`Error creating user balance: ${JSON.stringify(error)}`);
            }
        });
    }
    updateBalance(userId_1, amount_1) {
        return __awaiter(this, arguments, void 0, function* (userId, amount, currencyCode = "USD") {
            try {
                const command = new lib_dynamodb_1.UpdateCommand({
                    TableName: USER_BALANCES_TABLE,
                    Key: {
                        userId: userId,
                        currencyCode: currencyCode,
                    },
                    UpdateExpression: "SET amount = amount + :amt",
                    ConditionExpression: "attribute_exists(userId) AND attribute_exists(currencyCode)",
                    ExpressionAttributeValues: {
                        ":amt": amount,
                    },
                });
                yield dynamodb_1.db.send(command);
            }
            catch (error) {
                if (error.name === "ConditionalCheckFailedException") {
                    throw new Error(`User balance for ${currencyCode} does not exist.`);
                }
                throw new Error(`Error updating user balance: ${JSON.stringify(error)}`);
            }
        });
    }
}
exports.UserBalanceRepository = UserBalanceRepository;
