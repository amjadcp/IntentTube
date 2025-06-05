import React from 'react';

interface Channel {
  channelId: string;
  title: string;
  thumbnail: string;
}

interface ChannelCardProps {
  channel: Channel;
  onRemove: (channelId: string) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onRemove }) => {
  return (
    <div className="flex flex-col items-center border rounded shadow p-4 relative bg-white">
      <img src={channel.thumbnail} alt={channel.title} className="w-16 h-16 rounded-full mb-2" />
      <div className="font-semibold text-center mb-2">{channel.title}</div>
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        title="Remove channel"
        onClick={() => onRemove(channel.channelId)}
      >
        🗑️
      </button>
    </div>
  );
};

export default ChannelCard; 