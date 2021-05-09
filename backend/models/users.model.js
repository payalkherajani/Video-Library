import mongoose from 'mongoose'

const { Schema } = mongoose;

const userModel = new Schema(
    {
        name: {
            type: String,
            required: "Name is required"
        },
        email: {
            type: String,
            required: "Email is required"
        },
        otp: {
            type: Number,
            default: null
        },
        avatar: {
            type: String
        },
        is_active: {
            type: Boolean,
            default: true
        }
    },

    {
        timestamps: true
    }
)

const User = mongoose.model('User', userModel);

export default User;