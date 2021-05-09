import express from 'express'
const router = express.Router();
import { register, login, generatedOTP } from '../controllers/users.controller.js'

router.post('/register', register);
router.post('/generateotp', generatedOTP);
router.post('/login', login)


export default router;