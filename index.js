import express from "express";
import mongoose from "mongoose";



const app = express();


await mongoose.connect(process.env.MONGO_URL);
console.log('Database Is Connected');


const PORT = 4545;

app.listen(PORT, () => {
    console.log('App Is Listening On PORT')
})