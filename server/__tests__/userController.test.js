const User = require("../models/MillPrimeUser");
const Image = require("../models/Image");
const Subscriber = require("../models/Subscriber");
const {
  getUser,
  getAllUsers,
  getUserInfo,
  getModalInfo,
  createProfilePicture,
} = require("../controllers/userController");

jest.mock("../models/MillPrimeUser");
jest.mock("../models/Image");
jest.mock("../models/Subscriber");

const MOCK_ID = "507f1f77bcf86cd799439011";

const SAFE_USER = {
  _id: MOCK_ID,
  username: "testuser",
  email: "test@test.com",
};

describe("userController", () => {
  let req, res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("getUser", () => {
    it("returns 400 when id param is missing", async () => {
      req = { params: {} };
      await getUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("returns 204 when user is not found", async () => {
      req = { params: { id: MOCK_ID } };
      User.findOne.mockReturnValue({
        select: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
      });
      await getUser(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("calls .select('-password -refreshToken') and returns 200 with user", async () => {
      req = { params: { id: MOCK_ID } };
      const mockSelect = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(SAFE_USER) });
      User.findOne.mockReturnValue({ select: mockSelect });
      await getUser(req, res);
      expect(mockSelect).toHaveBeenCalledWith("-password -refreshToken");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(SAFE_USER);
    });

    it("handles database errors without sending a response", async () => {
      req = { params: { id: MOCK_ID } };
      User.findOne.mockReturnValue({
        select: jest.fn().mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error("DB error")) }),
      });
      await getUser(req, res);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("getAllUsers", () => {
    it("returns 204 when no users found", async () => {
      req = {};
      User.find.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });
      await getAllUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("calls .select('-password -refreshToken') and returns all users", async () => {
      req = {};
      const mockSelect = jest.fn().mockResolvedValue([SAFE_USER]);
      User.find.mockReturnValue({ select: mockSelect });
      await getAllUsers(req, res);
      expect(mockSelect).toHaveBeenCalledWith("-password -refreshToken");
      expect(res.json).toHaveBeenCalledWith([SAFE_USER]);
    });

    it("returns 408 on database error", async () => {
      req = {};
      User.find.mockReturnValue({ select: jest.fn().mockRejectedValue(new Error("DB error")) });
      await getAllUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(408);
    });
  });

  describe("getUserInfo", () => {
    it("calls .select('-password -refreshToken') and returns 200 with user", async () => {
      req = { body: { _id: MOCK_ID } };
      const mockSelect = jest.fn().mockResolvedValue([SAFE_USER]);
      User.find.mockReturnValue({ select: mockSelect });
      await getUserInfo(req, res);
      expect(mockSelect).toHaveBeenCalledWith("-password -refreshToken");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([SAFE_USER]);
    });

    it("returns 408 on database error", async () => {
      req = { body: { _id: MOCK_ID } };
      User.find.mockReturnValue({ select: jest.fn().mockRejectedValue(new Error("DB error")) });
      await getUserInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(408);
    });
  });

  describe("getModalInfo", () => {
    it("includes $project stage to exclude password and refreshToken from aggregate", async () => {
      req = { body: { _id: MOCK_ID } };
      User.aggregate.mockResolvedValue([SAFE_USER]);
      Subscriber.find.mockResolvedValue([]);
      await getModalInfo(req, res);
      expect(User.aggregate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ $project: { password: 0, refreshToken: 0 } }),
        ])
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("returns 200 with connects when subscriber list is non-empty", async () => {
      req = { body: { _id: MOCK_ID } };
      User.aggregate.mockResolvedValue([SAFE_USER]);
      Subscriber.find.mockResolvedValue([
        { userTo: "sub1" },
        { userTo: "sub2" },
        { userTo: "sub3" },
        { userTo: "sub4" },
      ]);
      await getModalInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      const response = res.json.mock.calls[0][0];
      expect(response).toHaveProperty("follows");
      expect(response).toHaveProperty("connects");
    });

    it("handles aggregate errors without sending a response", async () => {
      req = { body: { _id: MOCK_ID } };
      User.aggregate.mockRejectedValue(new Error("Aggregate error"));
      await getModalInfo(req, res);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("createProfilePicture", () => {
    it("chains .select('-password -refreshToken') on findByIdAndUpdate", async () => {
      req = { body: { _id: MOCK_ID, newImage: { image: "base64data" } } };
      Image.create.mockResolvedValue({ _id: "imgId" });
      const mockSelect = jest.fn().mockResolvedValue(SAFE_USER);
      User.findByIdAndUpdate.mockReturnValue({ select: mockSelect });
      await createProfilePicture(req, res);
      expect(mockSelect).toHaveBeenCalledWith("-password -refreshToken");
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("returns 400 on error", async () => {
      req = { body: { _id: MOCK_ID, newImage: { image: "base64data" } } };
      Image.create.mockRejectedValue(new Error("Create error"));
      await createProfilePicture(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
