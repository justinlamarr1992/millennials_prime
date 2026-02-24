const bcrypt = require("bcrypt");
const User = require("../models/MillPrimeUser");
const { handleSyncPassword } = require("../controllers/syncPasswordController");

// Mock firebase-admin via the config wrapper — must use factory so admin.auth is a jest.fn()
jest.mock("../config/firebaseAdmin", () => ({ auth: jest.fn() }));
jest.mock("../models/MillPrimeUser");
jest.mock("bcrypt");

const admin = require("../config/firebaseAdmin");

describe("handleSyncPassword", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer valid-firebase-id-token",
      },
      body: { newPassword: "newSecurePassword123!" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("returns 401 when Authorization header is missing", async () => {
    req.headers = {};
    await handleSyncPassword(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("returns 401 when Authorization header does not start with Bearer", async () => {
    req.headers = { authorization: "Basic abc123" };
    await handleSyncPassword(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("returns 401 when verifyIdToken throws (invalid or expired token)", async () => {
    admin.auth.mockReturnValue({
      verifyIdToken: jest.fn().mockRejectedValue(new Error("Token expired")),
    });
    await handleSyncPassword(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("returns 400 when newPassword is missing from body", async () => {
    admin.auth.mockReturnValue({
      verifyIdToken: jest.fn().mockResolvedValue({ email: "user@example.com" }),
    });
    req.body = {};
    await handleSyncPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "newPassword is required" });
  });

  it("returns 404 when user is not found in MongoDB", async () => {
    admin.auth.mockReturnValue({
      verifyIdToken: jest.fn().mockResolvedValue({ email: "unknown@example.com" }),
    });
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    await handleSyncPassword(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("returns 200 and updates password hash on success", async () => {
    const mockUser = {
      username: "user@example.com",
      password: "old-bcrypt-hash",
      save: jest.fn().mockResolvedValue({}),
    };
    admin.auth.mockReturnValue({
      verifyIdToken: jest.fn().mockResolvedValue({ email: "user@example.com" }),
    });
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
    bcrypt.hash.mockResolvedValue("new-bcrypt-hash");

    await handleSyncPassword(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("newSecurePassword123!", 10);
    expect(mockUser.password).toBe("new-bcrypt-hash");
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it("returns 401 when decoded token has no email field", async () => {
    admin.auth.mockReturnValue({
      verifyIdToken: jest.fn().mockResolvedValue({ uid: "uid-no-email" }),
    });
    await handleSyncPassword(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("propagates error when foundUser.save() throws", async () => {
    const mockUser = {
      username: "user@example.com",
      password: "old-bcrypt-hash",
      save: jest.fn().mockRejectedValue(new Error("DB write error")),
    };
    admin.auth.mockReturnValue({
      verifyIdToken: jest.fn().mockResolvedValue({ email: "user@example.com" }),
    });
    User.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
    bcrypt.hash.mockResolvedValue("new-bcrypt-hash");

    await expect(handleSyncPassword(req, res)).rejects.toThrow("DB write error");
  });
});
