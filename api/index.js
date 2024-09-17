import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import tester from './routes/user.route.js'
import signup from './routes/auth.route.js'
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
app.use('/auth/user',signup);