import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import ticketsRouter from "./src/router/ticket.js";
import usersRouter from "./src/router/user.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(ticketsRouter);
app.use(usersRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "This endpoint doesn't exist." });
});

app.listen(process.env.PORT, () => {
  console.log(`Your app is started on PORT ${process.env.PORT}`);
});
