import express, { json } from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.routes.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({
    limit: "16kb",
}))




app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/comment",commentRouter)


export default app