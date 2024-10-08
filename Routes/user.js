import { Router } from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import { signup, token,  } from "../Controllers/user.js";

// CREATE ROUTER
export const userRouter = Router();

// DEFINE ROUTER
userRouter.post ('/auth/signup', signup);

userRouter.post('/auth/login', token);

// userRouter.post('/api/auth/logout', isAuthenticated, logout);

// EXPORT ROUTER
// export default userRouter;