import express from 'express'
import { addNewChannel, getAllChannel } from '../controllers/channels.controller.js';
const router = express.Router()

router.post('/', addNewChannel);
router.get('/', getAllChannel);

export default router