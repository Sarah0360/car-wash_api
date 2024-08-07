import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import userRouter from "./Routes/user.js";

const app = express();

// APPLY MIDDLEWARES 
app.use(cors());
app.use(express.json({credentials: true, origin: '*'}));
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['user'],
    mongooseModels: mongoose.modelNames(),
});

// USE ROUTES
app.use(userRouter);

await mongoose.connect(process.env.MONGO_URL);
console.log('Database Is Connected');


const PORT = 4545;
app.listen(PORT, () => {
    console.log('App Is Listening On PORT')
});