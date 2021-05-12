import dotenv from 'dotenv';
import axios from 'axios'
dotenv.config()

//@route   GET api/videos/:id
//@desc    GET 10 videos of a channel
//@access  Private

const getVideosofChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const { data: { items } } = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.YOUTUBE_API}&part=contentDetails`);

        const uploadId = items[0].contentDetails.relatedPlaylists.uploads

        const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadId}&key=${process.env.YOUTUBE_API}&fields=items(id,snippet(channelId,title,description,publishedAt,resourceId.videoId))&part=snippet&maxResults=10`);

        res.status(200).send(data.items)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   GET api/videos/video/:id
//@desc    GET Single Video
//@access  Private

const getSingleVideo = async (req, res) => {
    try {
        const { videoId } = req.params
        const { data: { items } } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${process.env.YOUTUBE_API}`);

        const video = items[0]
        res.status(200).send(video)

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


//@route   GET api/videos/banner/:id
//@desc    GET Channel Banner
//@access  Private

const getBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${id}&key=${process.env.YOUTUBE_API}`);
        const { data: { items } } = response;
        const bannerimage = items[0].brandingSettings.image.bannerExternalUrl;
        res.status(200).send(bannerimage)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


export { getVideosofChannel, getSingleVideo, getBanner }