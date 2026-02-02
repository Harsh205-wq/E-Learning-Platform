import tryCatch from "../Middleware/trycatch.js";
import { Course } from "../Models/Courses.js";

export const getAllCourses=tryCatch(async(req,res)=>{
    const courses=await Course.find()
    res.json({
        courses,
    })
})

export const getSingleCourse=tryCatch(async(req,res)=>{
    const course=await Course.findById(req.params.id)

    res.json({
        course
    })
})