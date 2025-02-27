"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user/user");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/:id", this.controller.get);
        this.router.get("/:id/balance", this.controller.getBalance);
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRoutes = UserRoutes;
exports.default = new UserRoutes().getRouter();
