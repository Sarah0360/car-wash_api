import { Router } from "express";
import {  postBooking, updateBooking, cancelBooking } from "../Controllers/booking.js";
import { isAuthenticated } from "../Middlewares/auth.js";



export const bookingRouter = Router();

bookingRouter.post("/users/booking", isAuthenticated, postBooking);

bookingRouter.patch("/users/booking/:id", isAuthenticated, updateBooking);

bookingRouter.delete("/users/booking/:id", isAuthenticated, cancelBooking);

//export default bookingRouter;