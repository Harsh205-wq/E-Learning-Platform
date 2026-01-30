import express from 'express'
import { loginUser, myProfile, register, verifyUser } from '../Controllers/user.js';
import { isAuth } from '../Middleware/auth.js';


const router=express.Router();

router.post('/user/register',register)
router.post("/user/verify",verifyUser)
router.post("/user/login",loginUser)
router.post("/user/me",isAuth,myProfile)

export default router;