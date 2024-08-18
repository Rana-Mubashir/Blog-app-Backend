import { Router } from "express";
import { createPost, deletePost,  getAllPosts, updatePost,getUserAllPosts } from "../controllers/post.controller.js";

const postRouter=Router();

postRouter.post('/create',createPost)
postRouter.delete('/delete/:id',deletePost)
postRouter.put('/update/:id',updatePost)
postRouter.get('/getAllPosts',getAllPosts)
postRouter.get('/getUserAllPosts/:id',getUserAllPosts)



export default  postRouter