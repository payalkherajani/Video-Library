import jwt from 'jsonwebtoken';
import User from '../models/users.model.js'

export const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.id;
        const id = req.user;

        const verifiedUser = await User.findOne({ _id: id });

        if (verifiedUser && verifiedUser.is_active) {
            next();
        }
        else {
            return res.status(401).json({ message: 'Bad token, authorization denied' })
        }

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}