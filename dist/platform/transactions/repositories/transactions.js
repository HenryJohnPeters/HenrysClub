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
const transaction_type_1 = require("../models/transaction-type");
const TRANSACTIONS_TABLE = process.env.TRANSACTIONS_TABLE || "Transactions";
class TransactionRepository {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id,
                idempotencyId: Math.floor(Math.random() * 1000000),
                userId: Math.floor(Math.random() * 1000),
                type: Math.random() > 0.5 ? transaction_type_1.TransactionType.CREDIT : transaction_type_1.TransactionType.DEBIT,
                amount: Math.floor(Math.random() * 1000) + 1,
                createdAt: new Date(),
            };
            // const command = new GetCommand({
            //   TableName: TRANSACTIONS_TABLE,
            //   Key: { id },
            // });
            // const result = await db.send(command);
            // return (result.Item as BaseTransaction) || null;
        });
    }
    getByIdempotencyId(idempotencyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: Math.floor(Math.random() * 1000),
                idempotencyId,
                userId: Math.floor(Math.random() * 1000),
                type: Math.random() > 0.5 ? transaction_type_1.TransactionType.CREDIT : transaction_type_1.TransactionType.DEBIT,
                amount: Math.floor(Math.random() * 1000) + 1,
                createdAt: new Date(),
            };
            // const command = new GetCommand({
            //   TableName: TRANSACTIONS_TABLE,
            //   Key: { id },
            // });
            // const result = await db.send(command);
            // return (result.Item as BaseTransaction) || null;
        });
    }
    add(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction;
            //mapper
            // const command = new PutCommand({
            //   TableName: TRANSACTIONS_TABLE,
            //   Item: transaction,
            // });
            // await db.send(command);
            // return transaction;
        });
    }
}
exports.TransactionRepository = TransactionRepository;
