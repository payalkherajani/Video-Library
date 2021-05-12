import WatchLater from '../models/watchlater.model.js'

const getAllVideosinWL = async (req, res) => {
    try {
        res.status(200).send([])
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export { getAllVideosinWL }