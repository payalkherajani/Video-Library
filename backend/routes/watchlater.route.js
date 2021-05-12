import express from 'express';
import { getAllVideosinWL } from '../controllers/watchlater.controller.js'
const router = express.Router();

router.get('/', getAllVideosinWL);

export default router