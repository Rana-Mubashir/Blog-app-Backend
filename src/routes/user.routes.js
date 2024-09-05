import { Router } from "express";
import { createUser, loginUser } from "../controllers/User.controller.js";

const userRouter=Router()

userRouter.post('/create',createUser)
userRouter.post('/login',loginUser)

export default userRouter