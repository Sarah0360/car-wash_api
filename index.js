import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import {userRouter} from "./Routes/user.js";
import {serviceRouter} from "./Routes/services.js";
import {bookingRouter} from "./Routes/booking.js";

const app = express();

// APPLY MIDDLEWARES 
app.use(cors());
app.use(express.json({credentials: true, origin: '*'}));
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','Booking', 'Car Services'],
    mongooseModels: mongoose.modelNames(),
});



app.get("/api/v1/health", (req, res)=>{
    res.json({status: "UP"});
  });

// USE ROUTES
app.use(userRouter);
app.use(serviceRouter);
app.use(bookingRouter);


expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

await mongoose.connect(process.env.MONGO_URL);
console.log('Database Is Connected');


const PORT = 4545;
app.listen(PORT, () => {
    console.log('App Is Listening On PORT')
});