import jwt from "jsonwebtoken"
import { User } from "../Models/model.js";

export const isAuth=async(req,res,next)=>{
    try {
        const token=req.headers.token;
        if(!token)
          return  res.status(403).json({
           message:"Please Login"
        });
        const decodedData=jwt.verify(token,process.env.Jwt_sec);
        req.user=await User.findById(decodedData._id)
        next()

        
    } catch (error) {
        req.status(500).json({
            message:"Login First"
        })
    }
}