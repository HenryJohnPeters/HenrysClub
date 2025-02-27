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
exports.UserController = void 0;
const managers_1 = require("../../core/user/managers");
class UserController {
    constructor() {
        // GET /users/:id
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.manager.get(req.params.id);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        // GET /users/:id/balance
        this.getBalance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const balance = yield this.balanceManager.get(id);
                res.status(200).json({ userId: req.params.id, balance });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        this.manager = new managers_1.UserManager();
        this.balanceManager = new managers_1.UserBalanceManager();
    }
}
exports.UserController = UserController;
