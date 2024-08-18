import app from "./app.js"
import { connectDb } from "./db/db.js"
import dotenv from 'dotenv'

dotenv.config({
    path:'./env'
})

connectDb()
.then(()=>{
    app.listen(5000,()=>{
        console.log("server listening at port 5000")
    })
})
.catch(()=>{
    console.log("Server is not listening")
})
