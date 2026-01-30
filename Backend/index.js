import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./Database/db.js"

dotenv.config()


const app=express()

app.use(express.json())

const port=process.env.PORT

app.get('/',(req,res)=>{
    res.send("Server is working")
})

// importing routes
import userRoutes from "./Routes/user.js"

// using routes
app.use("/api",userRoutes)

app.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}`)
    connectDb()
})