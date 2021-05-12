import Channel from '../models/channels.model.js'

//@route   POST api/channels
//@desc    Add New Channel
//@access  Private

const addNewChannel = async (req, res) => {
    try {
        const { channelname, channelId, image } = req.body;
        const findChannel = await Channel.findOne({ channelId });

        if (findChannel) {
            return res.status(400).json({ success: false, message: 'Channel with ID exists' })
        }

        const addChannel = new Channel({
            channelname,
            channelId,
            image
        })

        await addChannel.save()
        res.status(200).send(addChannel)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

//@route   GET api/channels
//@desc    Get All Channels
//@access  Private

const getAllChannel = async (req, res) => {
    try {
        const channels = await Channel.find({})
        res.status(200).send(channels)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export { addNewChannel, getAllChannel }