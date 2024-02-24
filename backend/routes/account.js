import express from "express";
import { verifyToken } from "../middleware/index.js";
import {
  getAccountBalance,
  handleAccountTransfer,
} from "../controllers/account.js";

const router = express.Router();

router.get("/balance", verifyToken, getAccountBalance);
router.post("/transfer", verifyToken, handleAccountTransfer);

export default router;
