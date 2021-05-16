import express from 'express'
import { getAllPlaylists, togglePlaylist, addNewPlaylist, deletePlaylist, removeVideoFromPlaylist } from '../controllers/playlist.controller.js'
const router = express.Router()

router.get('/', getAllPlaylists)
router.put('/', togglePlaylist)
router.post('/', addNewPlaylist)
router.delete('/:playlistID', deletePlaylist)
router.delete('/:playlistID/:videoID', removeVideoFromPlaylist)

export default router;