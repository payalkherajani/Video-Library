import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateJWToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}