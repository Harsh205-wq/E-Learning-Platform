import tryCatch from "../Middleware/trycatch.js";
import {Course} from "../Models/Courses.js"
export const createCourse=tryCatch(async(req,res)=>{

    const{title,description,category,duration,price}=req.body
    const image=req.file;

    await Course.create({
        title,
        description,
        category,
        image:image?.path,
        duration,
        price,
    })
    res.status(201).json({
        message:"Course Created Successfully"
    })
})

export const addLecture=tryCatch(async(req,res)=>{
    const course=await Course.findById(req.params.id);

    if(!course){
        return res.status(404).json({
            message:"No Course with this id"
        });

        const {title,description}=req.body

        const file= req.file

        const lecture=await Lecture.create({
            title,
            description,
            video:file?.path,
            course:course._id
        })
        res.status(201).json({
            message:"Lecture Added",
            lecture,
        })
    }
})