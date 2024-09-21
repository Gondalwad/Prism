import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  // res.json(req.body);

  const { username, email, password, googlePhotoUrl } = req.body;

  if (!googlePhotoUrl || googlePhotoUrl == "") {
    googlePhotoUrl =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  }

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
    profilePicture: googlePhotoUrl,
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

///////Google Sign In Function

export const googlesignin = async (req, res, next) => {
  const { name, profileImage, email } = req.body;
  
  // Generate a unique username and Password and setting profileImage if not sent
  const googlePhotoUrl = profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const username =
    name.toLowerCase().trim().split(" ").join("") +
    Math.random().toString(9).slice(-4);
  const password =
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

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


  ////Hasing Password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  /// creating user if not existed
  const validUser = await User.findOne({ email });
  if (!validUser) {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl,
    });

    try {
      await newUser.save();
    } catch (err) {
      next(err);
    }
  }

  try{

    const signUser = await User.findOne({ email });
    const token = jwt.sign({ id: signUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = signUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);

  }catch(err){
    next(err);
  }

  

  // res.send("all working");

  // Call the signin function after signup
};

///// Sign In Functions
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email == "" || password == "") {
    return next(errorHandler(400, "No email or Password Entered"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, `No such Username ${email} found !`));
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
