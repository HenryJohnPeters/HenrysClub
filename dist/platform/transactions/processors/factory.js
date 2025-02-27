"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProcessorFactory = void 0;
const transaction_type_1 = require("../models/transaction-type");
const credit_1 = require("./credit");
const debit_1 = require("./debit");
class TransactionProcessorFactory {
    getProcessor(type) {
        switch (type) {
            case transaction_type_1.TransactionType.CREDIT:
                return new credit_1.CreditTransacionProcessor();
            case transaction_type_1.TransactionType.DEBIT:
                return new debit_1.DebitTransactionProcessor();
            default:
                throw new Error("Invalid transaction type");
        }
    }
}
exports.TransactionProcessorFactory = TransactionProcessorFactory;
