import express from 'express';
import { getAllVideosinWatchLater, addVideoToWatchLater, removeVideofromWatchLater, clearWatchLater } from '../controllers/watchlater.controller.js'
const router = express.Router();

router.get('/', getAllVideosinWatchLater);
router.post('/', addVideoToWatchLater);
router.delete('/:videoID', removeVideofromWatchLater);
router.delete('/', clearWatchLater);

export default router