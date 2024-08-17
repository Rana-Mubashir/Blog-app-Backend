import express, { json } from 'express'
import cors from 'cors'
const app = express();

app.use(cors ({
    origin:process.env.CORS_ORIGIN
}))

app.use (express.json({
    limit:"16kb",
}))


export default app