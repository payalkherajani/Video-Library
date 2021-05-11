import express from 'express'
import controllers from '../controllers/channels.controller.js';
const router = express.router()
const { addNewChannel, getAllChannel } = controllers

router.post('/', addNewChannel);
router.get('/', getAllChannel);

export default router