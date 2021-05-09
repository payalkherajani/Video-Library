import User from '../models/users.model.js';
import { mail } from '../utils/mail.js';
import { generateOTP } from '../utils/generateOTP.js';
import { OTPMail } from '../utils/sendOTPMail.js';
import { generateJWToken } from '../utils/generateToken.js';
import gravatar from 'gravatar';
import normalize from 'normalize-url';
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
        const avatar = normalize(
            gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }),
            { forceHttps: true }
        );

        const user = await new User({
            name,
            email,
            avatar
        })

        await user.save()
        await mail(name, email)
        res.status(200).json({ success: true, message: 'Registration Successfull ' })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   POST api/users/generateotp
//@desc    Generate 6-digit OTP
//@access  Public
const generatedOTP = async (req, res) => {
    try {
        const { email } = req.body;
        let verifyUser = await User.findOne({ email })
        if (!verifyUser) {
            return res.status(400).json({ success: false, message: 'Invalid Email' })
        }
        const OTP = Number(generateOTP());
        const data = await OTPMail(OTP, email);
        const updateUser = {
            otp: OTP
        }
        verifyUser = _.extend(verifyUser, updateUser)
        await verifyUser.save()
        res.status(200).send(verifyUser)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


//@route   POST api/users/login
//@desc    Login
//@access  Public
const login = async (req, res) => {
    try {
        const { email, otp } = req.body;
        let verifyUser = await User.findOne({ email })

        if (!verifyUser) {
            return res.status(400).json({ success: false, message: 'Invalid Email' })
        }

        if (otp === verifyUser.otp) {
            verifyUser = _.extend(verifyUser, { otp: null })
            await verifyUser.save()
            const token = generateJWToken(verifyUser._id);
            return res.status(200).send({ token })
        }

        verifyUser = _.extend(verifyUser, { otp: null })
        await verifyUser.save()
        res.status(400).json({ success: false, message: 'Invalid OTP' })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}
export { register, generatedOTP, login };