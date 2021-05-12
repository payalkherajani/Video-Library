import mongoose from 'mongoose'

const { Schema } = mongoose

const videosModel = new Schema(
    {
        videos: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Videos = mongoose.model('Video', videosModel)
export default Videos