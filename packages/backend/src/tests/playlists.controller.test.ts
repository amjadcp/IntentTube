import request from 'supertest';
import app from '../servers/express.server';

describe('Playlists API', () => {
  describe('GET /api/v1/playlists', () => {
    it('should require authentication', async () => {
      const res = await request(app).get('/api/v1/playlists');
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Unauthorized');
    });
    it('should fetch paginated list of user playlists', async () => {
      // TODO: Mock auth, assert paginated response
    });
  });

  describe('GET /api/v1/channels/:id/playlists', () => {
    it('should require authentication', async () => {
      const res = await request(app).get('/api/v1/channels/abc/playlists');
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Unauthorized');
    });
    it('should fetch paginated list of channel playlists', async () => {
      // TODO: Mock auth, assert paginated response
    });
  });

  describe('GET /api/v1/playlists/:id/videos', () => {
    it('should require authentication', async () => {
      const res = await request(app).get('/api/v1/playlists/abc/videos');
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error', 'Unauthorized');
    });
    it('should fetch paginated list of videos in a playlist', async () => {
      // TODO: Mock auth, assert paginated response
    });
  });
}); 