import express from 'express';
import { getAllLikedVideos, addInLikedVideo, removeFromLiked } from '../controllers/likedvideos.controller.js'
const router = express.Router();

router.get('/', getAllLikedVideos)
router.post('/', addInLikedVideo)
router.delete('/:videoID', removeFromLiked)

export default router;