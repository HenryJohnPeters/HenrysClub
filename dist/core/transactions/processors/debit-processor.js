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
const managers_1 = require("../../user/managers");
const managers_2 = require("../managers");
class DebitTransactionProcessor {
    constructor() {
        this.transactionManager = new managers_2.TransactionManager();
        this.userBalanceManager = new managers_1.UserBalanceManager();
    }
    process(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.userBalanceManager.get(transaction.userId);
            if (!balance) {
                throw new Error("Balance Not Found");
            }
            const updatedBalance = balance.amount - transaction.amount;
            yield this.userBalanceManager.update(transaction.userId, updatedBalance);
            yield this.transactionManager.add(transaction);
            //send events
        });
    }
}
exports.DebitTransactionProcessor = DebitTransactionProcessor;
