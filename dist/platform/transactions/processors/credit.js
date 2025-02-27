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
exports.CreditTransacionProcessor = void 0;
const repositories_1 = require("../repositories");
class CreditTransacionProcessor {
    constructor() {
        this.repo = new repositories_1.TransactionRepository();
    }
    process(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (transaction.amount <= 0)
                throw new Error("Credit amount must be greater than zero");
            yield this.repo.add(transaction);
        });
    }
}
exports.CreditTransacionProcessor = CreditTransacionProcessor;
