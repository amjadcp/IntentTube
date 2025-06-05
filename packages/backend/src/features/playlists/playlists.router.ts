import { Router } from 'express';
import { PlaylistsController } from './playlists.controller';

const router = Router();

router.get('/playlists', PlaylistsController.getUserPlaylists);
router.get('/channels/:id/playlists', PlaylistsController.getChannelPlaylists);
router.get('/playlists/:id/videos', PlaylistsController.getPlaylistVideos);

export default router; 