import { v4 as uuidv4 } from "uuid";
import UserModel from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SIGNUP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      money_balance: req.body.money_balance,
      id: uuidv4(),
    };

    const response = await new UserModel(user);

    await response.save();

    return res.status(201).json({ message: "User was created", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error inn application" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Your email or password is bad." });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Your email or password is bad." });
    }

    const token = jwt.sign(
      { email: user.email, userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error inn application" });
  }
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const response = await UserModel.findOne({ id: req.params.id });

    return res.status(200).json({ message: "User:", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error inn application" });
  }
};

const DELETE_USER_BY_ID = async (req, res) => {
  try {
    const response = await UserModel.findOneAndDelete({
      id: req.params.id,
    });

    if (!response) {
      return res.status(404).json({ message: "This ticket doesn't exist." });
    }

    return res.status(200).json({ message: "User was deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in application" });
  }
};
export { SIGNUP, GET_USER_BY_ID, DELETE_USER_BY_ID, LOGIN };
