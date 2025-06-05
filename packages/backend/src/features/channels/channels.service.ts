import { YouTubeAPI } from "../../utils/youtube.util";

interface FetchUserSubscriptionsParams {
  accessToken: string;
  page: number;
  limit: number;
  pageToken?: string;
}

export class ChannelsService {
  static async fetchSubscribedChannels({
    accessToken,
    page,
    limit,
    pageToken,
  }: FetchUserSubscriptionsParams) {
    // TODO: Fetch paginated list of subscribed channels from YouTube API or DB

    const params: Record<string, any> = {
      part: "snippet",
      mine: true,
      maxResults: limit,
      pageToken,
    };

    const data = await YouTubeAPI.get(
      "https://www.googleapis.com/youtube/v3/subscriptions",
      accessToken,
      params
    );

    const items = data.items.map((item: any) => ({
      channelId: item.snippet.resourceId.channelId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.default?.url || "",
    }));

    return {
      totalPages: Math.ceil(
        (data.pageInfo?.totalResults || items.length) / limit
      ),
      currentPage: page,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
      items,
    };
  }

  static async addChannelsToUser(userId: string, channelIds: string[]) {
    // TODO: Add channels to user's list in DB
  }

  static async removeChannelFromUser(userId: string, channelId: string) {
    // TODO: Remove channel from user's list in DB
  }
}
