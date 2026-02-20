jest.mock('../models/Subscriber');
jest.mock('../models/VideoModel');
jest.mock('mongoose');

const { getBunnyInfo } = require('../controllers/videoController');

describe('getBunnyInfo', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: { videoID: 'test-video-guid', title: 'Test Video' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    delete process.env.BUNNYCDN_LIBRARY_ID;
    delete process.env.BUNNYCDN_API_KEY;
  });

  it('returns 500 when env vars are missing', () => {
    getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'BunnyCDN not configured' });
  });

  it('returns 500 when only BUNNYCDN_LIBRARY_ID is missing', () => {
    process.env.BUNNYCDN_API_KEY = 'test-key';
    getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('returns 500 when only BUNNYCDN_API_KEY is missing', () => {
    process.env.BUNNYCDN_LIBRARY_ID = '147838';
    getBunnyInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('returns 200 with correct payload when env vars are set', () => {
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
