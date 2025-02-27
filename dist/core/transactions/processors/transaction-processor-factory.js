"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProcessorFactory = void 0;
const transaction_type_1 = require("../models/transaction-type");
const credit_processor_1 = require("./credit-processor");
const debit_processor_1 = require("./debit-processor");
class TransactionProcessorFactory {
    getProcessor(type) {
        switch (type) {
            case transaction_type_1.TransactionType.CREDIT:
                return new credit_processor_1.CreditTransactionProcessor();
            case transaction_type_1.TransactionType.DEBIT:
                return new debit_processor_1.DebitTransactionProcessor();
            default:
                throw new Error("Invalid transaction type");
        }
    }
}
exports.TransactionProcessorFactory = TransactionProcessorFactory;
