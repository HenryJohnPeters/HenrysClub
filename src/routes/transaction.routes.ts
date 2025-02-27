import { Router } from "express";
import { TransactionController } from "../controllers/transactions/transaction";
import { TransactionManager } from "../core/transactions/managers";
import { UserBalanceManager, UserManager } from "../core/user/managers";
import { TransactionRepository } from "../core/transactions/repositories";

export class TransactionRoutes {
  private router: Router;
  private controller: TransactionController;

  constructor(transactionManager: TransactionManager) {
    this.router = Router();
    this.controller = new TransactionController(transactionManager);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/credit", this.controller.credit);
    this.router.post("/debit", this.controller.debit);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const userManager = new UserManager();
const userBalanceManager = new UserBalanceManager();
const transactionRepository = new TransactionRepository();

const transactionManager = new TransactionManager(
  userManager,
  userBalanceManager,
  transactionRepository
);

export default new TransactionRoutes(transactionManager).getRouter();
