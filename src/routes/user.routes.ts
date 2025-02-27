import { Router } from "express";
import { UserController } from "../controllers/user/user";
import { UserBalanceManager, UserManager } from "../core/user/managers";
import {
  UserBalanceRepository,
  UserRepository,
} from "../core/user/repositories";

export class UserRoutes {
  private router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/:id/balance",
      this.controller.getBalance.bind(this.controller)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

const userRepository = new UserRepository();
const userManager = new UserManager(userRepository);

const userBalanceRepository = new UserBalanceRepository();
const userBalanceManager = new UserBalanceManager(userBalanceRepository);

const userController = new UserController(userBalanceManager);

const userRoutes = new UserRoutes(userController);

export default userRoutes.getRouter();
