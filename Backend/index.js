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

app.use("/uploads",express.static("uploads"))

// importing routes
import userRoutes from "./Routes/user.js"
import courseRoutes from "./Routes/course.routes.js"
import adminRoutes from "./Routes/admin.routes.js"

// using routes
app.use("/api",userRoutes);
app.use("/api",courseRoutes);
app.use("/api",adminRoutes);

app.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}`)
    connectDb()
})