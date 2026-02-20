const jwt = require("jsonwebtoken");
const User = require("../models/MillPrimeUser");
const { handleRefreshToken } = require("../controllers/refreshTokenController");

jest.mock("jsonwebtoken");
jest.mock("../models/MillPrimeUser");

describe("handleRefreshToken", () => {
  let req;
  let res;

  beforeEach(() => {
    req = { cookies: { jwt: "valid-refresh-token" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("returns 401 when refresh token cookie is missing", async () => {
    req.cookies = {};
    await handleRefreshToken(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("returns 403 when user is not found for the refresh token", async () => {
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    await handleRefreshToken(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  it("returns 403 when jwt.verify fails", async () => {
    const mockUser = { username: "testuser", roles: { User: 2001 }, _id: "507f1f77bcf86cd799439011", refreshToken: "valid-refresh-token" };
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
    jwt.verify.mockImplementation((_token, _secret, callback) => {
      callback(new Error("expired"), null);
    });
    await handleRefreshToken(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  it("signs the access token with _id in UserInfo payload", async () => {
    const mockId = "507f1f77bcf86cd799439011";
    const mockUser = { username: "testuser", roles: { User: 2001 }, _id: mockId, refreshToken: "valid-refresh-token" };
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
    jwt.verify.mockImplementation((_token, _secret, callback) => {
      callback(null, { username: "testuser" });
    });
    jwt.sign.mockReturnValue("new-access-token");

    await handleRefreshToken(req, res);

    const signCall = jwt.sign.mock.calls[0];
    expect(signCall[0].UserInfo._id).toBe(mockId);
    expect(signCall[0].UserInfo.username).toBe("testuser");
  });

  it("returns accessToken, roles, and _id in response on success", async () => {
    const mockId = "507f1f77bcf86cd799439011";
    const mockUser = { username: "testuser", roles: { User: 2001 }, _id: mockId, refreshToken: "valid-refresh-token" };
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
    jwt.verify.mockImplementation((_token, _secret, callback) => {
      callback(null, { username: "testuser" });
    });
    jwt.sign.mockReturnValue("new-access-token");

    await handleRefreshToken(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ accessToken: "new-access-token", _id: mockId })
    );
  });
});
