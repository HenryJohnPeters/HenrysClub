import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transaction.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/transactions", transactionRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
