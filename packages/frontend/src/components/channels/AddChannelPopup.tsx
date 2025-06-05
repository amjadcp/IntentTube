import React, { useState } from "react";
import { ChannelsService } from "../../services/channels.service";
// import { Button, Input, Modal, Spinner, Alert } from 'shadcn-ui'; // Uncomment if using Shadcn UI

interface Channel {
  channelId: string;
  title: string;
  thumbnail: string;
}

interface AddChannelPopupProps {
  curatedChannels?: Channel[]; // Optional: to check for duplicates
  onChannelAdded?: (channel: Channel) => void; // Optional: callback after add
}

const AddChannelPopup: React.FC<AddChannelPopupProps> = ({
  curatedChannels = [],
  onChannelAdded,
}) => {
  const [open, setOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Channel | null>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const openPopup = async () => {
    setOpen(true);
    setLoading(true);
    setError(null);
    setSubscriptions([]);
    try {
      const data = await ChannelsService.getSubscribedChannels();
      setSubscriptions(data.subscriptions || []);
    } catch (err: any) {
      setError(err.message || "Error fetching subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setOpen(false);
    setSelected(null);
    setAddError(null);
    setSuccess(false);
    setSearch("");
  };

  const handleAdd = async () => {
    if (!selected) return;
    if (curatedChannels.some((c) => c.channelId === selected.channelId)) {
      setAddError("Channel already added.");
      return;
    }
    setAdding(true);
    setAddError(null);
    try {
      await ChannelsService.addChannel(selected.channelId);
      setSuccess(true);
      if (onChannelAdded) onChannelAdded(selected);
      setTimeout(() => {
        closePopup();
      }, 1000);
    } catch (err: any) {
      setAddError(err.message || "Error adding channel");
    } finally {
      setAdding(false);
    }
  };

  const filtered = subscriptions.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button className="btn btn-primary" onClick={openPopup}>
        Add Channel
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2"
              onClick={closePopup}
              title="Close"
            >
              ✖️
            </button>
            <h3 className="text-lg font-bold mb-4">Add Channel</h3>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && (
              <>
                <input
                  className="w-full mb-2 p-2 border rounded"
                  placeholder="Search channels..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  disabled={adding}
                />
                <div className="max-h-48 overflow-y-auto mb-2">
                  {filtered.length === 0 ? (
                    <div>No subscriptions found.</div>
                  ) : (
                    filtered.map((channel) => (
                      <div
                        key={channel.channelId}
                        className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                          selected?.channelId === channel.channelId
                            ? "bg-gray-200"
                            : ""
                        }`}
                        onClick={() => setSelected(channel)}
                      >
                        <img
                          src={channel.thumbnail}
                          alt={channel.title}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>{channel.title}</span>
                      </div>
                    ))
                  )}
                </div>
                {addError && (
                  <div className="text-red-500 mb-2">{addError}</div>
                )}
                {success && (
                  <div className="text-green-600 mb-2">Channel added!</div>
                )}
                <button
                  className="btn btn-success w-full"
                  onClick={handleAdd}
                  disabled={!selected || adding}
                >
                  {adding ? "Adding..." : "Add Channel"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddChannelPopup;
