import { Request, Response, NextFunction } from 'express';
import passport from '../../configs/passport.config';
import { VerifyCallback } from 'passport-google-oauth20';
import { AuthenticationService } from './authentication.service';
import { FRONTEND_DOMAIN } from '../../configs/env.config';

export class AuthenticationController {
  static googleSignIn(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', {
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'],
      accessType: 'offline',
      prompt: 'consent',
    })(req, res, next);
  }

  static googleCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', (err: any, user: any, info: any) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      // Store tokens in HTTP-only cookies
      res.cookie('accessToken', user.accessToken, { httpOnly: true, sameSite: 'lax' });
      res.cookie('refreshToken', user.refreshToken, { httpOnly: true, sameSite: 'lax' });
      // Redirect or respond as 
      console.log('User authenticated:', user);
      
      return res.redirect(FRONTEND_DOMAIN);
    })(req, res, next);
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' });
      }
      const data = await AuthenticationService.refreshAccessToken(refreshToken);
      res.cookie('accessToken', data.access_token, { httpOnly: true, sameSite: 'lax' });
      return res.status(200).json({ message: 'Access token refreshed' });
    } catch (error: any) {
      return res.status(401).json({ error: error.message || 'Failed to refresh token' });
    }
  }

  static logout(req: Request, res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    req.logout(() => {
      res.status(200).json({ message: 'Logged out' });
    });
  }
} 