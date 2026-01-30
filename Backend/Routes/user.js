import express from 'express'
import { register } from '../Controllers/user.js';


const router=express.Router();

router.post('/user/register',register)

export default router;