import express from "express";
import {
  CREATE_TICKET,
  GET_USER_TICKETS,
  GET_TICKET_BY_ID,
  DELETE_TICKET_BY_ID,
} from "../controller/ticket.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/ticket", auth, CREATE_TICKET);
router.get("/ticket/:userId", auth, GET_USER_TICKETS);
router.get("/ticket/:id", auth, GET_TICKET_BY_ID);
router.delete("/ticket/:id", auth, DELETE_TICKET_BY_ID);

export default router;
