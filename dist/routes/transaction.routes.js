"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoutes = void 0;
const express_1 = require("express");
const transaction_1 = require("../controllers/transactions/transaction");
class TransactionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new transaction_1.TransactionController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/credit", this.controller.credit);
        this.router.post("/debit", this.controller.debit);
    }
    getRouter() {
        return this.router;
    }
}
exports.TransactionRoutes = TransactionRoutes;
exports.default = new TransactionRoutes().getRouter();
