import likedVideos from '../models/likedvideos.model.js'

//@route   GET api/likedvideos
//@desc    Get All Liked Videos
//@access  Private
const getAllLikedVideos = async (req, res) => {
    try {
        const id = req.user
        const allvideos = await likedVideos.findOne({ user: id })
        res.status(200).send(allvideos)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   POST api/likedvideos
//@desc    Add Video as LikedVideo
//@access  Private

const addInLikedVideo = async (req, res) => {
    try {
        const id = req.user;
        const { videoID } = req.body
        const videos = await likedVideos.findOne({ user: id })
        const isPresent = videos.likedvideos.some((v) => v === videoID)
        if (isPresent) {
            return res.status(400).json({ success: false, message: 'Already liked' })
        }
        const updatedVideos = [...videos.likedvideos, videoID]
        const updatedDetails = {
            user: id,
            likedvideos: updatedVideos
        }
        const addVideo = await likedVideos.findOneAndUpdate({ _id: videos._id }, { $set: updatedDetails }, { new: true })
        res.status(200).send(addVideo)

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   DELETE api/likedvideos/:videoID
//@desc    Remove Video from Liked
//@access  Private

const removeFromLiked = async (req, res) => {
    try {
        const id = req.user;
        const { videoID } = req.params
        const videos = await likedVideos.findOne({ user: id })
        const filterVideos = videos.likedvideos.filter((v) => v !== videoID)
        const updatedDetails = {
            user: id,
            likedvideos: filterVideos
        }

        const addVideo = await likedVideos.findOneAndUpdate({ _id: videos._id }, { $set: updatedDetails }, { new: true })
        res.status(200).send(addVideo)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}
export { getAllLikedVideos, addInLikedVideo, removeFromLiked }