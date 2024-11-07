import express, { json } from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.routes.js';
import { likesRouter } from './routes/postLikes.route.js';

const app = express();

// app.use('/',(req,res) => {
//      return res.status(200).json({
//         message:"Server is working"
//      })
// })

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({
    limit: "16kb",
}))

app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/comment",commentRouter)
app.use("/api/likes",likesRouter)


export default app