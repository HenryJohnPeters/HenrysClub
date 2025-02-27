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
exports.TransactionManager = void 0;
const repositories_1 = require("../repositories");
const managers_1 = require("../../user/managers");
const factory_1 = require("../processors/factory");
const transaction_type_1 = require("../models/transaction-type");
class TransactionManager {
    constructor() {
        this.transactionRepo = new repositories_1.TransactionRepository();
        this.userManager = new managers_1.UserManager();
        this.transactionProcessorFactory = new factory_1.TransactionProcessorFactory();
    }
    credit(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userManager.get(transaction.userId);
            if (!user)
                throw new Error("User not found");
            const existingTx = yield this.getByIdempotencyId(transaction.idempotencyId);
            if (existingTx)
                throw new Error("Transaction already exists");
            const processor = this.transactionProcessorFactory.getProcessor(transaction_type_1.TransactionType.CREDIT);
            yield processor.process(transaction);
        });
    }
    debit(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userManager.get(transaction.userId);
            if (!user)
                throw new Error("User not found");
            if (user.balance < transaction.amount)
                throw new Error("Insufficient balance");
            const existingTx = yield this.getByIdempotencyId(transaction.idempotencyId);
            if (existingTx)
                throw new Error("Transaction already exists");
            const processor = this.transactionProcessorFactory.getProcessor(transaction_type_1.TransactionType.DEBIT);
            yield processor.process(transaction);
        });
    }
    getByIdempotencyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // could cache
            return yield this.transactionRepo.getByIdempotencyId(id);
        });
    }
}
exports.TransactionManager = TransactionManager;
