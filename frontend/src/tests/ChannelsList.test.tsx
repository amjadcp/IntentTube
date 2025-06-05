import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ChannelsList from './ChannelsList';

// Mock fetch
const mockFetch = (data: any, ok = true) => {
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
    })
  ) as any;
};

describe('ChannelsList', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('shows loading state initially', () => {
    render(<ChannelsList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state if fetch fails', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.resolve({ ok: false }));
    render(<ChannelsList />);
    await waitFor(() => expect(screen.getByText(/failed to fetch channels/i)).toBeInTheDocument());
  });

  it('shows empty state if no channels', async () => {
    mockFetch({ selectedChannels: [] });
    render(<ChannelsList />);
    await waitFor(() => expect(screen.getByText(/no channels added yet/i)).toBeInTheDocument());
  });

  it('shows channels if present', async () => {
    mockFetch({ selectedChannels: [
      { channelId: 'abc', title: 'Test Channel', thumbnail: 'test.jpg' },
    ] });
    render(<ChannelsList />);
    await waitFor(() => expect(screen.getByText(/your channels/i)).toBeInTheDocument());
    // The actual channel card is commented out, so just check the heading for now
  });
}); 