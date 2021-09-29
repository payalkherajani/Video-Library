import mongoose from 'mongoose'
const { Schema } = mongoose

const historyVideosModel = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        historyvideos: {
            type: Array
        }
    },
    {
        timestamps: true
    }
)

const historyVideos = mongoose.model('historyVideos', historyVideosModel);
export default historyVideos