import { Router } from 'express';
import { VideosController } from './videos.controller';

const router = Router();

router.get('/channels/:id/videos', VideosController.getChannelVideos);
router.get('/playlists/:id/videos', VideosController.getPlaylistVideos);

export default router; 