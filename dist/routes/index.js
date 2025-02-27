"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_routes_1 = __importDefault(require("./transaction.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const router = (0, express_1.Router)();
//transaction routes
router.use("/transactions", transaction_routes_1.default);
//user routes
router.use("/users", user_routes_1.default);
exports.default = router;
