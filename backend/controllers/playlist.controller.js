import Playlist from '../models/playlists.model.js'
import _ from 'lodash'

//@route   GET api/playlist
//@desc    Get All Playlists
//@access  Private
const getAllPlaylists = async (req, res) => {
    try {
        const id = req.user
        const playlists = await Playlist.findOne({ user: id })
        res.status(200).send(playlists)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


//@route   PUT api/playlist
//@desc    Toggle Playlists
//@access  Private
const togglePlaylist = async (req, res) => {
    try {
        const id = req.user
        const { videoID, playlistID } = req.body
        let lists = await Playlist.findOne({ user: id })
        const updateItems = lists.playlists.map((p) => {
            if (p._id == playlistID) {
                const videoPresent = p.videos.some((v) => v == videoID)
                if (videoPresent) {
                    const filteredVideo = p.videos.filter((v) => v != videoID)
                    return { "_id": p._id, "name": p.name, "videos": filteredVideo }
                }
                else {
                    return { "_id": p._id, "name": p.name, "videos": [...p.videos, videoID] }
                }
            }
            return p
        })

        const updateDetails = {
            user: id,
            playlists: updateItems
        }
        const final = await Playlist.findOneAndUpdate({ _id: lists._id }, { $set: updateDetails }, { new: true })
        res.status(200).send(final)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   POST api/playlist
//@desc    Add New Playlist
//@access  Private
const addNewPlaylist = async (req, res) => {
    try {
        const id = req.user
        const { name, videoID } = req.body
        let pList = await Playlist.findOne({ user: id })
        const present = pList.playlists.some((p) => p.name === name)
        if (present) {
            return res.status(400).json({ success: false, message: 'Playlist with this name already present' })
        }
        const ToAdd = {
            name: name,
            videos: [videoID]
        }
        pList.playlists = _.concat(pList.playlists, ToAdd)
        await pList.save()
        res.status(200).send(pList)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


//@route   DELETE api/playlist/:playlistID
//@desc    Delete Playlist
//@access  Private
const deletePlaylist = async (req, res) => {
    try {
        const id = req.user;
        let lists = await Playlist.findOne({ user: id })
        const { playlistID } = req.params
        const present = lists.playlists.some((p) => p._id == playlistID)
        if (present) {
            const filterPlaylist = lists.playlists.filter((p) => p._id != playlistID)
            lists.playlists = filterPlaylist
            await lists.save()
            return res.status(200).send(lists)
        }
        return res.status(400).json({ success: false, message: 'No such Playlist exists' })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   DELETE api/playlist/:playlistID/:videoID
//@desc    Delete Playlist
//@access  Private

const removeVideoFromPlaylist = async (req, res) => {
    try {
        const userID = req.user
        const { playlistID, videoID } = req.params
        const requiredPlaylist = await Playlist.findOne({ user: userID })
        const finalVideos = requiredPlaylist.playlists.map((one) => {
            if (one._id == playlistID) {
                const findVideo = one.videos.some((v) => v == videoID)
                if (findVideo) {
                    const filtervideo = one.videos.filter((video) => video !== videoID)
                    return { "_id": one._id, "name": one.name, "videos": filtervideo }
                }
                return one
            }
            return one
        })

        const updateDetails = {
            user: userID,
            playlists: finalVideos
        }
        const final = await Playlist.findOneAndUpdate({ _id: requiredPlaylist._id }, { $set: updateDetails }, { new: true })
        res.status(200).send(final)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export { getAllPlaylists, togglePlaylist, addNewPlaylist, deletePlaylist, removeVideoFromPlaylist }