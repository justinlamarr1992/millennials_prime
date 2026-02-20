const { getBunnyInfo } = require('../controllers/videoController');

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
    req = { body: { videoID: 'test-video-guid', title: 'Test Video' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    delete process.env.BUNNYCDN_LIBRARY_ID;
    delete process.env.BUNNYCDN_API_KEY;
  });

  it('returns 503 when env vars are missing', () => {
    getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'BunnyCDN not configured' });
  });

  it('returns 503 when only BUNNYCDN_LIBRARY_ID is missing', () => {
    process.env.BUNNYCDN_API_KEY = 'test-key';
    getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(503);
  });

  it('returns 503 when only BUNNYCDN_API_KEY is missing', () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(503);
  });

  it('returns 400 when videoID is missing from body', () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    req.body = { title: 'Test Video' };
    getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'videoID is required' });
  });

  it('returns 200 with correct payload when env vars and videoID are set', () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const response = res.json.mock.calls[0][0];
    expect(response.success).toBe(true);
    expect(response.video_id).toBe('test-video-guid');
    expect(response.shaAttempt).toBeDefined();
    expect(response.authorizationExpire).toBeDefined();
  });

  it('returns libraryId from env var, not hardcoded 181057', () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    process.env.BUNNYCDN_API_KEY = 'test-key';
    getBunnyInfo(req, res);
    const response = res.json.mock.calls[0][0];
    expect(response.libraryId).toBe('147838');
    expect(response.libraryId).not.toBe(181057);
    expect(response.libraryId).not.toBe('181057');
  });
});
