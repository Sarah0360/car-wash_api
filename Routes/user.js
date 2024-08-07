import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { logout, signup, token,  } from "../Controllers/user.js";

// CREATE ROUTER
const userRouter = Router();

// DEFINE ROUTER
userRouter.post ('/api/auth/register', signup);

userRouter.post('/api/auth/login', token);

userRouter.post('/api/auth/logout', isAuthenticated, logout);

// EXPORT ROUTER
export default userRouter;