const Video = require("../models/VideoModel");
const { saveVideo } = require("../controllers/videoController");

jest.mock("../models/VideoModel");

describe("saveVideo", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      userId: "507f1f77bcf86cd799439011",
      body: {
        videoId: "bunny-cdn-guid-123",
        title: "Breaking News",
        description: "A brief description",
        category: "All News",
        audience: "millennials",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it("returns 400 when videoId is missing", async () => {
    req.body.videoId = undefined;
    await saveVideo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "videoId is required",
    });
  });

  it("creates a Video document with the correct field mapping", async () => {
    Video.create.mockResolvedValue({ video: "bunny-cdn-guid-123" });
    await saveVideo(req, res);
    expect(Video.create).toHaveBeenCalledWith({
      video: "bunny-cdn-guid-123",
      userPosting: "507f1f77bcf86cd799439011",
      title: "Breaking News",
      description: "A brief description",
      category: "All News",
      prime: "millennials",
    });
  });

  it("returns 201 with videoId on success", async () => {
    Video.create.mockResolvedValue({ video: "bunny-cdn-guid-123" });
    await saveVideo(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      videoId: "bunny-cdn-guid-123",
    });
  });

  it("returns 400 when Video.create throws a ValidationError", async () => {
    const err = new Error("validation failed");
    err.name = "ValidationError";
    Video.create.mockRejectedValue(err);
    await saveVideo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "validation failed",
    });
  });

  it("returns 400 when Video.create throws a CastError", async () => {
    const err = new Error("cast failed");
    err.name = "CastError";
    Video.create.mockRejectedValue(err);
    await saveVideo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "cast failed",
    });
  });

  it("returns 409 when Video.create throws a duplicate key error", async () => {
    const err = new Error("E11000 duplicate key error");
    err.code = 11000;
    Video.create.mockRejectedValue(err);
    await saveVideo(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Video GUID already exists",
    });
  });

  it("returns 500 when Video.create throws an unexpected error", async () => {
    Video.create.mockRejectedValue(new Error("DB connection failed"));
    await saveVideo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB connection failed",
    });
  });
});
