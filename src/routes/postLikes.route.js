import { Router } from "express";

import { getPostLikes,addLikes,deleteLike } from "../controllers/postLikes.controller.js";

const likesRouter=Router();

likesRouter.post('/add',addLikes)
likesRouter.delete('/delete/:postId',deleteLike)
likesRouter.get('/getPostLikes/:postId',getPostLikes)

export {likesRouter}