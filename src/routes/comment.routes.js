import { Router } from "express";
import { createComment, getPostAllComments } from "../controllers/comment.controller.js";

const commentRouter=Router();

commentRouter.post("/create",createComment)
commentRouter.get("/getAll/:id",getPostAllComments);

export default commentRouter