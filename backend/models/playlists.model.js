import mongoose from 'mongoose'
const { Schema } = mongoose

const PlaylistModel = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        playlists: [
            {
                name: {
                    type: String
                },
                videos: {
                    type: Array
                }
            }
        ]
    },
    {
        timestamps: true
    }

)

const Playlist = mongoose.model('playlists', PlaylistModel)
export default Playlist