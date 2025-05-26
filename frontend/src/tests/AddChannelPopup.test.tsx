import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddChannelPopup from './AddChannelPopup';
import { vi } from 'vitest';

// Mock the ChannelsService
vi.mock('./channels.service', () => ({
  ChannelsService: {
    getSubscribedChannels: vi.fn(),
    addChannels: vi.fn(),
  },
}));

describe('AddChannelPopup (Multi-Select)', () => {
  it('renders a button to open the popup', () => {
    render(<AddChannelPopup />);
    expect(screen.getByRole('button', { name: /add channel/i })).toBeInTheDocument();
  });

  it('opens the popup and fetches subscriptions on click', async () => {
    render(<AddChannelPopup />);
    fireEvent.click(screen.getByRole('button', { name: /add channel/i }));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    // Simulate API call and check channels rendered
  });

  it('shows error state if fetching subscriptions fails', async () => {
    // Simulate API error and check error message
  });

  it('shows empty state if no subscriptions are found', async () => {
    // Simulate empty API response and check empty message
  });

  it('allows searching/filtering subscriptions by channel name', async () => {
    // Simulate typing in search box and check filtered results
  });

  it('allows selecting multiple channels and displays them as pills', async () => {
    // Simulate selecting multiple channels
    // Check that selected channels appear as removable pills (Shadcn UI chips)
  });

  it('allows removing a selected channel pill', async () => {
    // Simulate removing a selected channel pill
    // Check that it is removed from the selection
  });

  it('submits all selected channels at once', async () => {
    // Simulate clicking submit and check that addChannels is called with all selected channel IDs
    // Check for success feedback
  });

  it('shows error feedback if adding channels fails', async () => {
    // Simulate addChannels API error and check error message
  });

  it('prevents adding duplicate channels', async () => {
    // Simulate selecting a channel already in curated list and check for duplicate warning
  });

  it('closes the popup on success or cancel', async () => {
    // Simulate successful add and check popup closes
    // Simulate cancel button and check popup closes
  });

  // Add more edge case tests as needed
}); 