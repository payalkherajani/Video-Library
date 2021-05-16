import historyVideos from '../models/history.model.js'

//@route   GET api/history
//@desc    Get All history Videos
//@access  Private
const getAllHistoryVideos = async (req, res) => {
    try {
        const id = req.user;
        const videos = await historyVideos.findOne({ user: id })
        res.status(200).send(videos)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   POST api/history
//@desc    Add Video as LikedVideo
//@access  Private

const addVideoToHistory = async (req, res) => {
    try {
        const id = req.user
        const videos = await historyVideos.findOne({ user: id })
        const { videoID } = req.body;
        const isPresent = videos.historyvideos.some((v) => v === videoID)
        if (isPresent) {
            return res.status(200).json({ success: false, message: 'Video Already in History' })
        }
        const updatedVideos = [...videos.historyvideos, videoID]
        const updatedDetails = {
            user: id,
            historyvideos: updatedVideos
        }
        const addVideo = await historyVideos.findOneAndUpdate({ _id: videos._id }, { $set: updatedDetails }, { new: true })
        res.status(200).send(addVideo)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   DELETE api/history/:videoID
//@desc    Remove Video from history
//@access  Private

const removeFromHistory = async (req, res) => {
    try {
        const id = req.user;
        const { videoID } = req.params
        const videos = await historyVideos.findOne({ user: id })
        const filterVideos = videos.historyvideos.filter((v) => v !== videoID)
        const updatedDetails = {
            user: id,
            historyvideos: filterVideos
        }
        const addVideo = await historyVideos.findOneAndUpdate({ _id: videos._id }, { $set: updatedDetails }, { new: true })
        res.status(200).send(addVideo)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   DELETE api/history
//@desc    Remove All Videos from history
//@access  Private

const clearHistory = async (req, res) => {
    try {
        const id = req.user;
        const videos = await historyVideos.findOne({ user: id })
        const updatedDetails = {
            user: id,
            historyvideos: []
        }

        const addVideo = await historyVideos.findOneAndUpdate({ _id: videos._id }, { $set: updatedDetails }, { new: true })
        res.status(200).send(addVideo)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export { getAllHistoryVideos, addVideoToHistory, removeFromHistory, clearHistory }