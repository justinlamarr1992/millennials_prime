const User = require('../models/MillPrimeUser');
const { getBunnyInfo } = require('../controllers/videoController');

jest.mock('../models/MillPrimeUser');

const MOCK_USER_ID = '507f1f77bcf86cd799439011';

describe('getBunnyInfo', () => {
  let req;
  let res;
  let originalLibraryId;
  let originalApiKey;

  beforeAll(() => {
    originalLibraryId = process.env.BUNNYCDN_LIBRARY_ID;
    originalApiKey = process.env.BUNNYCDN_API_KEY;
  });

  afterAll(() => {
    process.env.BUNNYCDN_LIBRARY_ID = originalLibraryId;
    process.env.BUNNYCDN_API_KEY = originalApiKey;
  });

  beforeEach(() => {
    req = {
      body: { videoID: 'test-video-guid', title: 'Test Video' },
      user: 'testuser',
      userId: MOCK_USER_ID,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    delete process.env.BUNNYCDN_LIBRARY_ID;
    delete process.env.BUNNYCDN_API_KEY;
    jest.clearAllMocks();
  });

  const mockUserLookup = (resolvedValue) => {
    User.findById.mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(resolvedValue),
      }),
    });
  };

  const mockUserLookupError = (error) => {
    User.findById.mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockRejectedValue(error),
      }),
    });
  };

  it('returns 503 when env vars are missing', async () => {
    await getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'BunnyCDN not configured' });
  });

  it('returns 503 when only BUNNYCDN_LIBRARY_ID is missing', async () => {
    process.env.BUNNYCDN_API_KEY = 'test-key';
    await getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(503);
  });

  it('returns 503 when only BUNNYCDN_API_KEY is missing', async () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    await getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(503);
  });

  it('returns 400 when videoID is missing from body', async () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    req.body = { title: 'Test Video' };
    await getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'videoID is required' });
  });

  it('returns 403 when user is not a prime content creator', async () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    mockUserLookup({ prime: false });
    await getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Content creators only' });
  });

  it('returns 403 when user is not found', async () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    mockUserLookup(null);
    await getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Content creators only' });
  });

  it('returns 500 when user lookup fails', async () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    mockUserLookupError(new Error('DB error'));
    await getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: expect.any(String) });
  });

  it('returns 200 with correct payload when user is prime and all params valid', async () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    mockUserLookup({ prime: true });
    await getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const response = res.json.mock.calls[0][0];
    expect(response.success).toBe(true);
    expect(response.video_id).toBe('test-video-guid');
    expect(response.shaAttempt).toBeDefined();
    expect(response.authorizationExpire).toBeDefined();
  });

  it('looks up user by userId and selects only prime field', async () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    const mockSelect = jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue({ prime: true }) });
    User.findById.mockReturnValue({ select: mockSelect });
    await getBunnyInfo(req, res);
    expect(User.findById).toHaveBeenCalledWith(MOCK_USER_ID);
    expect(mockSelect).toHaveBeenCalledWith('prime');
  });

  it('returns libraryId from env var, not hardcoded 181057', async () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    mockUserLookup({ prime: true });
    await getBunnyInfo(req, res);
    const response = res.json.mock.calls[0][0];
    expect(response.libraryId).toBe('147838');
    expect(response.libraryId).not.toBe(181057);
    expect(response.libraryId).not.toBe('181057');
  });
});
