import mongoose, { Mongoose } from 'mongoose'
const { Schema } = mongoose

const watchLaterModel = new Mongoose(
    {
        watchlater: {
            type: Array
        }
    },
)

const WatchLater = mongoose.model('WatchLater', watchLaterModel);
export default WatchLater