import { Router } from 'express';
import channelsRouter from '../features/channels/channels.router';
import videosRouter from '../features/videos/videos.router';
import playlistsRouter from '../features/playlists/playlists.router';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware';

const router = Router();

router.use(isAuthenticated);
router.use('/channels', channelsRouter);
router.use('/videos', videosRouter); // Not used directly, but for future extensibility
router.use('/playlists', playlistsRouter);

export default router; 