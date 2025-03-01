import { Router } from "express";
import { TransactionController } from "../controllers/transactions/transaction";
import { TransactionManager } from "../core/transactions/managers";
import { UserBalanceManager, UserManager } from "../core/user/managers";
import { TransactionRepository } from "../core/transactions/repositories";
import {
  UserBalanceRepository,
  UserRepository,
} from "../core/user/repositories";

export class TransactionRoutes {
  private router: Router;

  constructor(private controller: TransactionController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/credit", this.controller.credit.bind(this.controller));
    this.router.post("/debit", this.controller.debit.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

const userRepository = new UserRepository();
const userManager = new UserManager(userRepository);

const userBalanceRepository = new UserBalanceRepository();
const userBalanceManager = new UserBalanceManager(userBalanceRepository);

const transactionRepository = new TransactionRepository();

const transactionManager = new TransactionManager(
  userManager,
  userBalanceManager,
  transactionRepository
);

const transactionController = new TransactionController(transactionManager);
export default new TransactionRoutes(transactionController).getRouter();
