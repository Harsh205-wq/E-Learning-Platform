import express from 'express'
import { isAdmin, isAuth } from '../Middleware/auth.js';
import { addLecture, createCourse } from '../Controllers/admin.js';
import { uploadFiles } from '../Middleware/multer.js';

const router=express.Router();

router.post('/course/new',isAuth,isAdmin,uploadFiles,createCourse)
router.post('/course/:id',isAuth,isAdmin,uploadFiles,addLecture)
export default router;
