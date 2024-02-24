import express from "express";
import {
  editUser,
  getBulkUsers,
  getUserData,
  handleSignin,
  handleSignup,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/index.js";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/signin", handleSignin);
router.put("/", verifyToken, editUser);
router.get("/bulk", getBulkUsers);
router.get("/", verifyToken, getUserData);

export default router;
