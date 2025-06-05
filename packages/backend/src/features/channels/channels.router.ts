import { Router } from 'express';
import { ChannelsController } from './channels.controller';

const router = Router();

function asyncHandler(fn: any) {
  return (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);
}

router.get('/subscribed', asyncHandler(ChannelsController.getSubscribedChannels));
router.get('/curated', asyncHandler(ChannelsController.getCuratedChannels)); // For user's curated list
router.post('/add', asyncHandler(ChannelsController.addChannels));
router.delete('/remove', asyncHandler(ChannelsController.removeChannel));

export default router; 