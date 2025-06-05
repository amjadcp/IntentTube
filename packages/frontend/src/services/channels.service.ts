export class ChannelsService {
  static async getCuratedChannels() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/v1/channels/curated`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch channels');
    return res.json();
  }

  static async addChannels(channelIds: string[]) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/v1/channels/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ channelIds }),
    });
    if (!res.ok) throw new Error('Failed to add channels');
    return res.json();
  }

  static async removeChannel(channelId: string) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/v1/channels/remove`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ channelId }),
    });
    if (!res.ok) throw new Error('Failed to remove channel');
    return res.json();
  }

  static async getSubscriptions(page = 1, limit = 10, pageToken?: string) {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (pageToken) params.append('pageToken', pageToken);
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/v1/channels/subscribed?${params.toString()}`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch subscriptions');
    return res.json();
  }
} 