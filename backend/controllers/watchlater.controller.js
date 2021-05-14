import WatchLater from '../models/watchlater.model.js'
import _ from 'lodash';

//@route   GET api/watchlater
//@desc    Register new User
//@access  Public
const getAllVideosinWL = async (req, res) => {
    try {
        const id = req.user
        const watchLaterVideos = await WatchLater.findOne({ user: id })
        res.status(200).send(watchLaterVideos)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   POST api/watchlater
//@desc    Add Video in watchlater array
//@access  Private

const addVideoToWL = async (req, res) => {
    try {
        const id = req.user;
        const allvideos = await WatchLater.findOne({ user: id });
        const { videoID } = req.body;
        const exists = allvideos.watchlater.some((v) => v === videoID)

        if (exists) {
            return res.status(400).json({ success: false, message: 'Video already exists in Watch Later' })
        }

        const updatedWatchLater = [...allvideos.watchlater, videoID]

        const updatedDetails = {
            user: id,
            watchlater: updatedWatchLater
        }

        const addVideo = await WatchLater.findOneAndUpdate({ _id: allvideos._id }, { $set: updatedDetails }, { new: true })

        res.status(200).send(addVideo)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   DELETE api/watchlater/:videoID
//@desc    Remove Video from WL
//@access  Private

const removeVideo = async (req, res) => {
    try {
        const { videoID } = req.params
        const id = req.user;

        const allVideos = await WatchLater.findOne({ user: id })
        const filterVideos = allVideos.watchlater.filter((v) => v === videoID)
        const updatedDetails = {
            user: id,
            watchlater: filterVideos
        }

        const addVideo = await WatchLater.findOneAndUpdate({ _id: allVideos._id }, { $set: updatedDetails }, { new: true })
        res.status(200).send(addVideo)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }

}

//@route   DELETE api/watchlater
//@desc    Remove All Videos from WL
//@access  Private

const clearWL = async (req, res) => {
    try {
        const id = req.user;
        const allVideos = await WatchLater.findOne({ user: id })
        const updatedDetails = {
            user: id,
            watchlater: []
        }

        const clearAllVideos = await WatchLater.findOneAndUpdate({ _id: allVideos._id }, { $set: updatedDetails }, { new: true })
        res.status(200).send(clearAllVideos)

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}
export { getAllVideosinWL, addVideoToWL, removeVideo, clearWL }