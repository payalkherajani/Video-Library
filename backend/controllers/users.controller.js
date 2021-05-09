import User from '../models/users.model.js'
import { mail } from '../utils/mail.js'
import { generateOTP } from '../utils/generateOTP.js'
import { OTPMail } from '../utils/sendOTPMail.js';
import _ from 'lodash';

//@route   POST api/users/register
//@desc    Register new User
//@access  Public

const register = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ success: false, message: 'name and email are required fields' })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email already in use, Try different email' })
        }

        const user = await new User({
            name,
            email
        })

        await user.save()
        await mail(name, email)
        res.status(200).json({ success: true, message: 'Registration Successfull ' })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const generatedOTP = async (req, res) => {
    try {
        const { email } = req.body;
        let verifyUser = await User.findOne({ email })
        if (!verifyUser) {
            return res.status(400).json({ success: false, message: 'Invalid Email' })
        }
        const OTP = Number(generateOTP());
        // await OTPMail(OTP, email);
        const updateUser = {
            otp: OTP
        }
        verifyUser = _.extend(verifyUser, updateUser)
        await verifyUser.save()
        res.status(200).send(verifyUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


const login = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const verifyUser = await User.findOne({ email })

        if (!verifyUser) {
            return res.status(400).json({ success: false, message: 'Invalid Email' })
        }

        if (otp === verifyUser.otp) {
            //jwt token
            return res.status(200).json({ success: true, message: 'Successfull Login' })
            //clear otp
        }

        //clear otp from database
        res.status(400).json({ success: false, message: 'Invalid OTP' })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}
export { register, generatedOTP, login };