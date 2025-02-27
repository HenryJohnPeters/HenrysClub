import { Router } from "express";
import transactionRoutes from "./transaction.routes";
import userRoutes from "./user.routes";

const router = Router();

//transaction routes
router.use("/transactions", transactionRoutes);

//user routes
router.use("/users", userRoutes);

export default router;
