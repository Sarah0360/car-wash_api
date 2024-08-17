import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { restartServer } from "./restart_server.js"; 
import expressOasGenerator from "@mickeymond/express-oas-generator";
import {userRouter} from "./Routes/user.js";
import {bookingRouter} from "./Routes/booking.js";
import {serviceRouter} from "./Routes/services.js"
import { errorHandler } from "./Middlewares/errorHandler.js";


const app = express();

// APPLY MIDDLEWARES 
app.use(express.json());

app.use(cors({credentials: true, origin: '*'}));

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','Booking', 'Car Services'],
    mongooseModels: mongoose.modelNames(),
});

app.get("/api/v1/health", (req, res)=>{
    res.json({status: "UP"});
  });

// USE ROUTES
app.use("/api/v1", userRouter);
app.use("/api/v1", serviceRouter);
app.use("/api/v1", bookingRouter);


expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

const reboot = async () => {
setInterval(restartServer, process.env.INTERVAL)
}
const PORT = 4545;  ////process.env.PORT;

await mongoose.connect(process.env.MONGO_URL)
console.log('Database Is Connected')

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is connected to Port ${PORT}`)
})
reboot().then(() =>{
    console.log(`Server Restarted`);
}).catch ((err) => {
    console.log(err);
    process.exit(-1);
});


