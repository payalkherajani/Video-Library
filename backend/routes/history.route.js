import express from 'express'
import { getAllHistoryVideos, addVideoToHistory, removeFromHistory, clearHistory } from '../controllers/history.controller.js'
const router = express.Router()

router.get('/', getAllHistoryVideos)
router.post('/', addVideoToHistory)
router.delete('/:videoID', removeFromHistory)
router.delete('/', clearHistory)

export default router