import express from 'express';
import { getVideosofChannel, getSingleVideo } from '../controllers/videos.controller.js'
const router = express.Router();

router.get('/:id', getVideosofChannel)
router.get('/video/:videoId', getSingleVideo)

export default router;