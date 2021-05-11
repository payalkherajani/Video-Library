import Channel from '../models/channels.model.js'

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
        res.status(200).send(addNewChannel)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const getAllChannel = async (req, res) => {
    try {
        const channels = await Channel.find({})
        res.status(200).send(channels)
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export { addNewChannel, getAllChannel }