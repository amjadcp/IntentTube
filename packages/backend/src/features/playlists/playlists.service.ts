export class PlaylistsService {
  static async fetchUserPlaylists(userId: string, page: number, limit: number) {
    // TODO: Fetch paginated list of user playlists from YouTube API
  }

  static async fetchChannelPlaylists(channelId: string, page: number, limit: number) {
    // TODO: Fetch paginated list of channel playlists from YouTube API
  }

  static async fetchPlaylistVideos(playlistId: string, page: number, limit: number) {
    // TODO: Fetch paginated list of videos in a playlist from YouTube API
  }
} 