import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import tester from './routes/user.route.js'
import signUser from './routes/auth.route.js'

dotenv.config();
const app = express();

// Mongo DB database Connections
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("Connected to database !");
}).catch(err=>{
    console.log(err);
});


app.listen(3000,()=>{
    console.log("Your server is running on port 3000");
});

app.use(express.json());
app.use('/api/user',tester);
app.use('/auth/user',signUser);


//middle ware to handle errors
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});