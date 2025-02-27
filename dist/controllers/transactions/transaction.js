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
exports.TransactionController = void 0;
const managers_1 = require("../../core/transactions/managers");
class TransactionController {
    constructor() {
        // POST /transactions/debit
        this.debit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield this.manager.debit(req.body);
                res.status(201).json(transaction);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        // POST /transactions/credit
        this.credit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield this.manager.credit(req.body);
                res.status(201).json(transaction);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        this.manager = new managers_1.TransactionManager();
    }
}
exports.TransactionController = TransactionController;
