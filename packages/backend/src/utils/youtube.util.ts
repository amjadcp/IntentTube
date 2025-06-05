import axios from 'axios';

export class YouTubeAPI {
  static async get<T = any>(url: string, accessToken: string, params: Record<string, any> = {}) {
    try {
      const response = await axios.get<T>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error?.message || 'YouTube API error');
      }
      throw new Error('YouTube API request failed');
    }
  }
} 