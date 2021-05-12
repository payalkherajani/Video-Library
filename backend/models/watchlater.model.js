import mongoose from 'mongoose'
const { Schema } = mongoose

const watchLaterModel = new Schema(
    {
        watchlater: {
            type: Array
        }
    },
    {
        timestamps: true
    }
)

const WatchLater = mongoose.model('WatchLater', watchLaterModel);
export default WatchLater