import mongoose from 'mongoose'

const { Schema } = mongoose;

const channelModel = new Schema(
    {
        channelname: {
            type: String,
            required: true
        },
        channelId: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true
    }
)

const Channel = mongoose.model('Channel', channelModel)

export default Channel;