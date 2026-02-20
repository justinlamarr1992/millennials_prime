const jwt = require("jsonwebtoken");
const verifyJWT = require("../middleware/verifyJWT");

jest.mock("jsonwebtoken");

describe("verifyJWT", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { headers: { authorization: "Bearer test-token" } };
    res = { sendStatus: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("calls next() and sets req.user, req.roles, req.userId on valid token", () => {
    const mockDecoded = {
      UserInfo: {
        username: "testuser",
        roles: [2001],
        _id: "507f1f77bcf86cd799439011",
      },
    };
    jwt.verify.mockImplementation((_token, _secret, callback) => {
      callback(null, mockDecoded);
    });

    verifyJWT(req, res, next);

    expect(req.user).toBe("testuser");
    expect(req.roles).toEqual([2001]);
    expect(req.userId).toBe("507f1f77bcf86cd799439011");
    expect(next).toHaveBeenCalled();
  });

  it("returns 403 when token is invalid", () => {
    jwt.verify.mockImplementation((_token, _secret, callback) => {
      callback(new Error("invalid signature"), null);
    });

    verifyJWT(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when Authorization header is missing", () => {
    req.headers = {};

    verifyJWT(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when Authorization header does not start with Bearer", () => {
    req.headers.authorization = "Basic dXNlcjpwYXNz";

    verifyJWT(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
