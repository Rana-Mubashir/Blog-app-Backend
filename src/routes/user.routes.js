import { Router } from "express";
import { createUser } from "../controllers/User.controller.js";

const userRouter=Router()

userRouter.post('/create',createUser)

export default userRouter