import { Router } from 'express';
import { AuthenticationController } from './authentication.controller';

const router = Router();

function asyncHandler(fn: any) {
  return (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);
}

router.get('/google', AuthenticationController.googleSignIn);
router.get('/google/callback', AuthenticationController.googleCallback);
router.post('/refresh', asyncHandler(AuthenticationController.refreshToken));
router.post('/logout', AuthenticationController.logout);

export default router; 