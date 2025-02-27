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
exports.UserManager = void 0;
const repositories_1 = require("../repositories");
class UserManager {
    constructor() {
        this.userRepo = new repositories_1.UserRepository();
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // could cache and get here
            return yield this.userRepo.get(id);
        });
    }
    // ✅ Get user balance
    getBalance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // could cache and get here
            return yield this.userRepo.getBalance(id);
        });
    }
}
exports.UserManager = UserManager;
