const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/MillPrimeUser");
const { handleLogin } = require("../controllers/authController");

jest.mock("../models/MillPrimeUser");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("handleLogin", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: { user: "testuser", password: "password123" },
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
      cookie: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("returns 400 when user or password is missing", async () => {
    req.body = {};
    await handleLogin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 401 when user is not found", async () => {
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    await handleLogin(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("returns 401 when password does not match", async () => {
    User.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue({ username: "testuser", password: "hashed", roles: {} }),
    });
    bcrypt.compare.mockResolvedValue(false);
    await handleLogin(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("signs the access token with _id in UserInfo payload", async () => {
    const mockId = "507f1f77bcf86cd799439011";
    const mockUser = {
      username: "testuser",
      password: "hashed",
      roles: { User: 2001 },
      _id: mockId,
      refreshToken: null,
      save: jest.fn().mockResolvedValue({}),
    };
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mock-token");

    await handleLogin(req, res);

    const accessTokenCall = jwt.sign.mock.calls[0];
    expect(accessTokenCall[0].UserInfo._id).toBe(mockId);
    expect(accessTokenCall[0].UserInfo.username).toBe("testuser");
  });

  it("returns accessToken and _id in response on success", async () => {
    const mockId = "507f1f77bcf86cd799439011";
    const mockUser = {
      username: "testuser",
      password: "hashed",
      roles: { User: 2001 },
      _id: mockId,
      refreshToken: null,
      save: jest.fn().mockResolvedValue({}),
    };
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mock-token");

    await handleLogin(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ accessToken: "mock-token", _id: mockId })
    );
  });

  it("includes refreshToken in response body on success", async () => {
    const mockId = "507f1f77bcf86cd799439011";
    const mockUser = {
      username: "testuser",
      password: "hashed",
      roles: { User: 2001 },
      _id: mockId,
      refreshToken: null,
      save: jest.fn().mockResolvedValue({}),
    };
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign
      .mockReturnValueOnce("mock-access-token")
      .mockReturnValueOnce("mock-refresh-token");

    await handleLogin(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ refreshToken: "mock-refresh-token" })
    );
  });
});
