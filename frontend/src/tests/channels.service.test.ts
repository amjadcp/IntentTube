import { ChannelsService } from './channels.service';

describe('ChannelsService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('getCuratedChannels returns data on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ selectedChannels: [] }) }) as any;
    const data = await ChannelsService.getCuratedChannels();
    expect(data).toHaveProperty('selectedChannels');
  });

  it('getCuratedChannels throws on error', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false }) as any;
    await expect(ChannelsService.getCuratedChannels()).rejects.toThrow('Failed to fetch channels');
  });

  it('addChannels returns data on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ selectedChannels: [] }) }) as any;
    const data = await ChannelsService.addChannels(['abc']);
    expect(data).toHaveProperty('selectedChannels');
  });

  it('addChannels throws on error', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false }) as any;
    await expect(ChannelsService.addChannels(['abc'])).rejects.toThrow('Failed to add channels');
  });

  it('removeChannel returns data on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ selectedChannels: [] }) }) as any;
    const data = await ChannelsService.removeChannel('abc');
    expect(data).toHaveProperty('selectedChannels');
  });

  it('removeChannel throws on error', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false }) as any;
    await expect(ChannelsService.removeChannel('abc')).rejects.toThrow('Failed to remove channel');
  });

  it('getSubscriptions returns data on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [] }) }) as any;
    const data = await ChannelsService.getSubscriptions();
    expect(data).toHaveProperty('items');
  });

  it('getSubscriptions throws on error', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false }) as any;
    await expect(ChannelsService.getSubscriptions()).rejects.toThrow('Failed to fetch subscriptions');
  });
}); 