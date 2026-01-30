import { User } from "../Models/model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendMail from "../Middleware/sendMail.js"
import tryCatch from "../Middleware/trycatch.js"

export const register=async(req,res)=>{
    try {
        const{email,name,password}=req.body
        let user=await User.findOne({email});
        if(user) return res.status(400).json({
            message:"User Already exists"
        })

        const hashPassword=await bcrypt.hash(password,10)


        user={
            name,
            email,
            password:hashPassword
        }

        const otp=Math.floor(Math.random()*1000000);
        const activationtoken=jwt.sign({
            user,
            otp,
        },process.env.Activation_Secret,
        {
            expiresIn:"5m"
        }
    );

    const data={
        name,
        otp,
    };
    await sendMail(
        email,
        'E-Learning',
        data
    )
    res.status(200).json({
        message:"Otp send to your mail",
        activationtoken,
    })






    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}
export const verifyUser=tryCatch(async(req,res)=>{
    const {otp,activationtoken}=req.body
    const verify=jwt.verify(activationtoken,process.env.Activation_Secret)
    if(!verify) return res.status(400).json({
        message:"Otp expired"
    })
    if(verify.otp!==otp)
         return res.status(400).json({
        message:"Wrong otp",
        }) 
    await User.create({
        name:verify.user.name,
        email:verify.user.email,
        password:verify.user.password,
    })
    res.json({
        message:"User Registered"
    })
})
export const loginUser=tryCatch(async(req,res)=>{
    const {email,password}=req.body

    const user= await User.findOne({email})
    if(!user)
        return res.status(400).json({
    message:"No user with this email"
    })

    const matchPassword=await bcrypt.compare(password,user.password)
    if(!matchPassword)
        return res.status(400).json({
         message:"Wrong Password"
    })
    const token=await jwt.sign({
        _id:user._id
    },
    process.env.JWT_Sec,{
        expiresIn:"15d",
    }
)
   res.json({
      message:`Welcome back ${user.name}`,
      token,
      user
   })
})
export const myProfile=tryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id)
    res.json({user})
})