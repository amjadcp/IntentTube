import { Request, Response } from "express";
import { YouTubeAPI } from "../../utils/youtube.util";
import { User } from "../../models/User.model";
import { ChannelsService } from "./channels.service";

export class ChannelsController {
  static async getSubscribedChannels(req: Request, res: Response) {
    try {
      const accessToken = (req.user as any)?.accessToken;
      if (!accessToken) return res.status(401).json({ error: "Unauthorized" });
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const pageToken = req.query.pageToken as string | undefined;

      const response = await ChannelsService.fetchSubscribedChannels({
        accessToken,
        limit,
        page,
        pageToken,
      });

      res.json(response);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Failed to fetch subscriptions" });
    }
  }

  static async addChannels(req: Request, res: Response) {
    try {
      const accessToken = (req.user as any)?.accessToken;
      const userId =
        (req.user as any)?.profile?.id || (req.user as any)?.googleId;
      if (!accessToken || !userId)
        return res.status(401).json({ error: "Unauthorized" });
      const { channelIds } = req.body;
      if (!Array.isArray(channelIds) || channelIds.length === 0) {
        return res
          .status(400)
          .json({ error: "channelIds must be a non-empty array" });
      }

      // Fetch channel details from YouTube
      const params = {
        part: "snippet",
        id: channelIds.join(","),
        maxResults: channelIds.length,
      };
      const data = await YouTubeAPI.get(
        "https://www.googleapis.com/youtube/v3/channels",
        accessToken,
        params
      );
      const newChannels = data.items.map((item: any) => ({
        channelId: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.default?.url || "",
      }));

      // Update user in MongoDB
      const user = await User.findOne({ googleId: userId });
      if (!user) return res.status(404).json({ error: "User not found" });
      // Avoid duplicates
      const existingIds = new Set(
        user.selectedChannels.map((c) => c.channelId)
      );
      for (const ch of newChannels) {
        if (!existingIds.has(ch.channelId)) {
          user.selectedChannels.push(ch);
        }
      }
      await user.save();
      res.json({ selectedChannels: user.selectedChannels });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Failed to add channels" });
    }
  }

  static async removeChannel(req: Request, res: Response) {
    try {
      const userId =
        (req.user as any)?.profile?.id || (req.user as any)?.googleId;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      const { channelId } = req.body;
      if (!channelId || typeof channelId !== "string") {
        return res.status(400).json({ error: "channelId is required" });
      }
      const user = await User.findOne({ googleId: userId });
      if (!user) return res.status(404).json({ error: "User not found" });
      user.selectedChannels = user.selectedChannels.filter(
        (c) => c.channelId !== channelId
      );
      await user.save();
      res.json({ selectedChannels: user.selectedChannels });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Failed to remove channel" });
    }
  }

  static async getCuratedChannels(req: Request, res: Response) {
    try {
      const userId =
        (req.user as any)?.profile?.id || (req.user as any)?.googleId;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      const user = await User.findOne({ googleId: userId });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ selectedChannels: user.selectedChannels });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Failed to fetch curated channels" });
    }
  }
}
