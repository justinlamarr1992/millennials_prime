const verifyRoles = require("../middleware/verifyRoles");

describe("verifyRoles", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    res = { sendStatus: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("returns 401 when req.roles is missing", () => {
    req = {};
    verifyRoles(2001)(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when user does not have the required role", () => {
    req = { roles: [1984] };
    verifyRoles(2001)(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next() when user has the required role", () => {
    req = { roles: [2001] };
    verifyRoles(2001)(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.sendStatus).not.toHaveBeenCalled();
  });

  it("calls next() when user has one of multiple allowed roles", () => {
    req = { roles: [2001] };
    verifyRoles(5150, 1984, 2001)(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("returns 401 when user has none of multiple allowed roles", () => {
    req = { roles: [2001] };
    verifyRoles(5150, 1984)(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
