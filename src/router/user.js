import express from "express";
import {
  LOGIN,
  SIGNUP,
  GET_USER_BY_ID,
  DELETE_USER_BY_ID,
} from "../controller/user.js";

const router = express.Router();

router.post("/signup", SIGNUP);
router.post("/login", LOGIN);
router.get("/user/:id", GET_USER_BY_ID);
router.delete("/user/:id", DELETE_USER_BY_ID);

export default router;
