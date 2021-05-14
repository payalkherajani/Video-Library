import express from 'express';
import { getAllVideosinWL, addVideoToWL, removeVideo, clearWL } from '../controllers/watchlater.controller.js'
const router = express.Router();

router.get('/', getAllVideosinWL);
router.post('/', addVideoToWL);
router.delete('/:videoID', removeVideo);
router.delete('/', clearWL);

export default router