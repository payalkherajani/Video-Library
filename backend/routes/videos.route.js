import express from 'express';
import { getVideosofChannel, getSingleVideo, getBanner } from '../controllers/videos.controller.js'
const router = express.Router();

router.get('/:id', getVideosofChannel)
router.get('/video/:videoId', getSingleVideo)
router.get('/banner/:id', getBanner)

export default router;