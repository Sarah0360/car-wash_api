import { Router } from "express";
import { booking, deleteBooking, updateBooking } from "../Controllers/booking";
import { isAuthenticated } from "../Middlewares/auth.js";



const bookingRouter = Router();

bookingRouter.post("/users/booking", isAuthenticated, booking);

bookingRouter.patch("/users/booking/:id", isAuthenticated, updateBooking);

bookingRouter.delete("/users/booking/:id", isAuthenticated, deleteBooking);

export default bookingRouter;