import mongoose from 'mongoose'
const { Schema } = mongoose

const likedVideosModel = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        likedvideos: {
            type: Array
        }
    },
    {
        timestamps: true
    }
)

const likedVideos = mongoose.model('likedVideos', likedVideosModel);
export default likedVideos