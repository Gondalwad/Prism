import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    // res.json(req.body);

    const {username,email,password} = req.body;

    if(!username || !email || !password || username == "" || password == "" || email == ""){
        res.status(400).json({"message":"All fields Are Required !"});
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });


    try{
        await newUser.save();
        res.json("Account Created");
    }catch(err){
        const errMsg = `${Object.keys(err.keyPattern)} is already in use`;
        res.json(errMsg);
    }

    //task->
    // validate userInfo username email password
    // save to database
    // hashing password using bcryptjs
};
