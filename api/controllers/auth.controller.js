import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  // res.json(req.body);

  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    password == "" ||
    email == ""
  ) {
    // res.status(400).json({"message":"All fields Are Required !"});
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Account Created");
  } catch (err) {
    // const errMsg = `${Object.keys(err.keyPattern)} is already in use`;
    // err.message = errMsg;

    next(err);
  }

  //task->
  // validate userInfo username email password
  // save to database
  // hashing password using bcryptjs
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username == "" || password == "") {
    return next(errorHandler(400, "No username or Password Entered"));
  }

  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorHandler(400, `No such Username ${username} found !`));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Incorrect Username or Password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
