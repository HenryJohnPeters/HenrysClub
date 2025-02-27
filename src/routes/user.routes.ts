import { Router } from "express";
import { UserController } from "../controllers/user/user";
import { UserBalanceManager } from "../core/user/managers";

export class UserRoutes {
  private router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/:id/balance", this.controller.getBalance);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const userBalanceManager = new UserBalanceManager();
const userController = new UserController(userBalanceManager);

export default new UserRoutes(userController).getRouter();
