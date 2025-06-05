import { Request, Response } from 'express';

export class PlaylistsController {
  static async getUserPlaylists(req: Request, res: Response) {
    // TODO: Fetch paginated list of user playlists
  }

  static async getChannelPlaylists(req: Request, res: Response) {
    // TODO: Fetch paginated list of channel playlists
  }

  static async getPlaylistVideos(req: Request, res: Response) {
    // TODO: Fetch paginated list of videos in a playlist
  }
} 