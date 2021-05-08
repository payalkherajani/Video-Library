import User from '../models/users.model.js'

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
        //send email here for successful registration

        res.status(200).json({ success: true, message: 'Registration Successfull ' })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}



export { register };