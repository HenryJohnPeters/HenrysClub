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
exports.DebitTransactionProcessor = void 0;
const repositories_1 = require("../repositories");
class DebitTransactionProcessor {
    constructor() {
        this.repo = new repositories_1.TransactionRepository();
    }
    process(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (transaction.amount <= 0) {
                throw new Error("Debit amount must be greater than zero");
            }
            const existing = yield this.repo.getByIdempotencyId(transaction.idempotencyId);
            if (existing)
                throw new Error("Transaction already exists");
            yield this.repo.add(transaction);
        });
    }
}
exports.DebitTransactionProcessor = DebitTransactionProcessor;
