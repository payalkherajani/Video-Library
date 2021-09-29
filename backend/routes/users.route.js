import express from 'express'
import { register, login, generatedOTP, getUserByID, guestLogin } from '../controllers/users.controller.js'
import { auth } from '../middleware/auth.js'


const router = express.Router();
router.post('/register', register);
router.post('/generateotp', generatedOTP);
router.post('/login', login);
router.post('/guestlogin', guestLogin)
router.get('/', auth, getUserByID)


export default router;