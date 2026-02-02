import express from 'express'
import { getAllCourses, getSingleCourse } from '../Controllers/course.controllers.js';

const router=express.Router();

router.get("/course/all",getAllCourses)
router.get("/course/:id",getSingleCourse)

export default router;