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
exports.TransactionRepository = void 0;
const dynamodb_1 = require("../../../config/dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const TRANSACTIONS_TABLE = process.env.TRANSACTIONS_TABLE || "transactions";
class TransactionRepository {
    get(userId, idempotencyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new lib_dynamodb_1.GetCommand({
                TableName: TRANSACTIONS_TABLE,
                Key: {
                    userId: userId,
                    idempotencyId: idempotencyId,
                },
            });
            const result = yield dynamodb_1.db.send(command);
            return result.Item || null;
        });
    }
    getByIdempotencyId(idempotencyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new lib_dynamodb_1.QueryCommand({
                TableName: TRANSACTIONS_TABLE,
                IndexName: "idempotencyId-index",
                KeyConditionExpression: "idempotencyId = :idempotencyId",
                ExpressionAttributeValues: {
                    ":idempotencyId": { N: idempotencyId.toString() },
                },
            });
            const result = yield dynamodb_1.db.send(command);
            return result.Items && result.Items.length > 0
                ? result.Items[0]
                : undefined;
        });
    }
    add(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new lib_dynamodb_1.PutCommand({
                TableName: TRANSACTIONS_TABLE,
                Item: transaction,
            });
            yield dynamodb_1.db.send(command);
            return transaction;
        });
    }
}
exports.TransactionRepository = TransactionRepository;
