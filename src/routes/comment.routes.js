import { Router } from "express";
import { createComment } from "../controllers/comment.controller.js";

const commentRouter=Router();

commentRouter.post("/create",createComment)

export default commentRouter