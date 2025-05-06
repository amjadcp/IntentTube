import React, { useEffect, useState } from 'react';
import ChannelCard from './ChannelCard';
import AddChannelPopup from './AddChannelPopup';
import { ChannelsService } from './channels.service';

interface Channel {
  channelId: string;
  title: string;
  thumbnail: string;
}

const ChannelsList: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    fetchChannels();
    // eslint-disable-next-line
  }, []);

  const fetchChannels = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ChannelsService.getCuratedChannels();
      setChannels(data.selectedChannels || []);
    } catch (err: any) {
      setError(err.message || 'Error fetching channels');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (channelId: string) => {
    setRemoving(channelId);
    try {
      const data = await ChannelsService.removeChannel(channelId);
      setChannels(data.selectedChannels || []);
    } catch (err: any) {
      setError(err.message || 'Error removing channel');
    } finally {
      setRemoving(null);
    }
  };

  const handleChannelAdded = (channel: Channel) => {
    // Optionally, refetch or optimistically update the list
    setChannels((prev) => [...prev, channel]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Channels</h2>
      <AddChannelPopup curatedChannels={channels} onChannelAdded={handleChannelAdded} />
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map((channel) => (
          <ChannelCard
            key={channel.channelId}
            channel={channel}
            onRemove={handleRemove}
          />
        ))}
        {channels.length === 0 && !loading && <div>No channels added yet.</div>}
      </div>
      {removing && <div className="text-gray-500 mt-2">Removing channel...</div>}
    </div>
  );
};

export default ChannelsList; 