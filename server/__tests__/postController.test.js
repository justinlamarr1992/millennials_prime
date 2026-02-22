const Post = require("../models/postModel");
const User = require("../models/MillPrimeUser");
const {
  getOwnPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

jest.mock("../models/postModel");
jest.mock("../models/MillPrimeUser");

const AUTHOR_ID = "507f1f77bcf86cd799439011";
const OTHER_ID = "507f1f77bcf86cd799439012";
const POST_ID = "507f1f77bcf86cd799439013";
const IMAGE_URL = "https://example.com/img.jpg";
const VIDEO_ID = "bunny-guid-123";
const UPDATED_IMAGE_URL = "https://example.com/updated.jpg";
const UPDATED_VIDEO_ID = "bunny-guid-updated";

const mockAuthor = {
  _id: AUTHOR_ID,
  name: "Test User",
  username: "testuser",
  prime: false,
  roles: { User: 2001 },
};

const mockPost = {
  _id: POST_ID,
  type: "text",
  title: "Test Post",
  description: "Test description",
  author: AUTHOR_ID,
  likeCount: 0,
  commentCount: 0,
  createdAt: new Date("2024-01-01T00:00:00.000Z"),
};

const mockPostPopulated = { ...mockPost, author: mockAuthor };

const expectedPostResponse = {
  id: POST_ID,
  type: "text",
  title: "Test Post",
  description: "Test description",
  authorId: AUTHOR_ID,
  authorName: "Test User",
  isPrime: false,
  isAdmin: false,
  createdAt: new Date("2024-01-01T00:00:00.000Z").toISOString(),
  likeCount: 0,
  commentCount: 0,
};

const findChain = (result) => ({
  populate: jest.fn().mockReturnValue({
    sort: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(result),
    }),
  }),
});

describe("postController", () => {
  let req, res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // ─── getOwnPosts ─────────────────────────────────────────────────────────────

  describe("getOwnPosts", () => {
    beforeEach(() => {
      req = { userId: AUTHOR_ID };
    });

    it("returns 200 with mapped posts and totalCount", async () => {
      Post.find.mockReturnValue(findChain([mockPostPopulated]));
      await getOwnPosts(req, res);
      expect(Post.find).toHaveBeenCalledWith({ author: AUTHOR_ID });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        posts: [expectedPostResponse],
        totalCount: 1,
      });
    });

    it("returns empty posts array when user has no posts", async () => {
      Post.find.mockReturnValue(findChain([]));
      await getOwnPosts(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, posts: [], totalCount: 0 });
    });

    it("falls back to 'Unknown' when author has no name or username", async () => {
      const anonymousAuthor = { _id: AUTHOR_ID, name: null, username: null, prime: false, roles: {} };
      const anonymousPost = { ...mockPost, author: anonymousAuthor };
      Post.find.mockReturnValue(findChain([anonymousPost]));
      await getOwnPosts(req, res);
      const json = res.json.mock.calls[0][0];
      expect(json.posts[0].authorName).toBe("Unknown");
    });

    it("returns 500 on unexpected error", async () => {
      Post.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            exec: jest.fn().mockRejectedValue(new Error("DB error")),
          }),
        }),
      });
      await getOwnPosts(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ─── getUserPosts ─────────────────────────────────────────────────────────────

  describe("getUserPosts", () => {
    beforeEach(() => {
      req = { userId: AUTHOR_ID, params: { userId: OTHER_ID } };
    });

    it("returns 400 when userId is not a valid ObjectId", async () => {
      req.params = { userId: "not-valid" };
      await getUserPosts(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid userId" });
    });

    it("returns 404 when user not found", async () => {
      User.findById.mockResolvedValue(null);
      await getUserPosts(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "User not found" });
    });

    it("returns 200 with mapped posts", async () => {
      User.findById.mockResolvedValue(mockAuthor);
      Post.find.mockReturnValue(findChain([mockPostPopulated]));
      await getUserPosts(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        posts: [expectedPostResponse],
        totalCount: 1,
      });
    });

    it("returns 500 on unexpected error", async () => {
      User.findById.mockRejectedValue(new Error("DB error"));
      await getUserPosts(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ─── createPost ───────────────────────────────────────────────────────────────

  describe("createPost", () => {
    beforeEach(() => {
      req = { userId: AUTHOR_ID, body: { type: "text", title: "Test Post", description: "Test description" } };
    });

    it("returns 400 when type is missing", async () => {
      req.body = { title: "Test" };
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "type is required" });
    });

    it("returns 400 when type is invalid", async () => {
      req.body = { type: "audio", title: "Test" };
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid post type" });
    });

    it("returns 400 when title is missing", async () => {
      req.body = { type: "text" };
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "title is required" });
    });

    it("returns 400 when imageUrl is missing for picture post", async () => {
      req.body = { type: "picture", title: "Test" };
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "imageUrl is required for picture posts" });
    });

    it("returns 400 when videoId is missing for video post", async () => {
      req.body = { type: "video", title: "Test" };
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "videoId is required for video posts" });
    });

    it("returns 201 with created text post", async () => {
      const doc = { ...mockPost, populate: jest.fn().mockResolvedValue(mockPostPopulated) };
      Post.create.mockResolvedValue(doc);
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, post: expectedPostResponse });
    });

    it("returns 201 with created picture post including imageUrl", async () => {
      req.body = { type: "picture", title: "Pic Post", imageUrl: IMAGE_URL };
      const picPost = { ...mockPost, type: "picture", imageUrl: IMAGE_URL };
      const picPopulated = { ...picPost, author: mockAuthor };
      const doc = { ...picPost, populate: jest.fn().mockResolvedValue(picPopulated) };
      Post.create.mockResolvedValue(doc);
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      const json = res.json.mock.calls[0][0];
      expect(json.post.type).toBe("picture");
      expect(json.post.imageUrl).toBe(IMAGE_URL);
    });

    it("returns 201 with created video post including videoId", async () => {
      req.body = { type: "video", title: "Vid Post", videoId: VIDEO_ID };
      const vidPost = { ...mockPost, type: "video", videoId: VIDEO_ID };
      const vidPopulated = { ...vidPost, author: mockAuthor };
      const doc = { ...vidPost, populate: jest.fn().mockResolvedValue(vidPopulated) };
      Post.create.mockResolvedValue(doc);
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      const json = res.json.mock.calls[0][0];
      expect(json.post.type).toBe("video");
      expect(json.post.videoId).toBe(VIDEO_ID);
    });

    it("returns 500 on unexpected error", async () => {
      Post.create.mockRejectedValue(new Error("DB error"));
      await createPost(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ─── updatePost ───────────────────────────────────────────────────────────────

  describe("updatePost", () => {
    let docForUpdate;

    beforeEach(() => {
      req = { userId: AUTHOR_ID, params: { id: POST_ID }, body: { title: "Updated Title" } };
      docForUpdate = {
        ...mockPost,
        author: AUTHOR_ID,
        save: jest.fn().mockResolvedValue({}),
        populate: jest.fn().mockResolvedValue({ ...mockPostPopulated, title: "Updated Title" }),
      };
    });

    it("returns 400 when post id is not a valid ObjectId", async () => {
      req.params = { id: "not-valid" };
      await updatePost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid post id" });
    });

    it("returns 404 when post not found", async () => {
      Post.findById.mockResolvedValue(null);
      await updatePost(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Post not found" });
    });

    it("returns 403 when user is not the author", async () => {
      Post.findById.mockResolvedValue({ ...docForUpdate, author: OTHER_ID });
      await updatePost(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Not authorized" });
    });

    it("returns 200 with updated post", async () => {
      Post.findById.mockResolvedValue(docForUpdate);
      await updatePost(req, res);
      expect(docForUpdate.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, post: expect.objectContaining({ title: "Updated Title" }) })
      );
    });

    it("does not apply imageUrl to a text post", async () => {
      req.body = { imageUrl: UPDATED_IMAGE_URL };
      Post.findById.mockResolvedValue(docForUpdate);
      await updatePost(req, res);
      expect(docForUpdate.imageUrl).toBeUndefined();
    });

    it("does not apply videoId to a text post", async () => {
      req.body = { videoId: UPDATED_VIDEO_ID };
      Post.findById.mockResolvedValue(docForUpdate);
      await updatePost(req, res);
      expect(docForUpdate.videoId).toBeUndefined();
    });

    it("applies imageUrl to a picture post", async () => {
      const picDoc = {
        ...docForUpdate,
        type: "picture",
        populate: jest.fn().mockResolvedValue({ ...mockPostPopulated, type: "picture", imageUrl: UPDATED_IMAGE_URL }),
      };
      req.body = { imageUrl: UPDATED_IMAGE_URL };
      Post.findById.mockResolvedValue(picDoc);
      await updatePost(req, res);
      expect(picDoc.imageUrl).toBe(UPDATED_IMAGE_URL);
    });

    it("applies videoId to a video post", async () => {
      const vidDoc = {
        ...docForUpdate,
        type: "video",
        populate: jest.fn().mockResolvedValue({ ...mockPostPopulated, type: "video", videoId: UPDATED_VIDEO_ID }),
      };
      req.body = { videoId: UPDATED_VIDEO_ID };
      Post.findById.mockResolvedValue(vidDoc);
      await updatePost(req, res);
      expect(vidDoc.videoId).toBe(UPDATED_VIDEO_ID);
    });

    it("returns 500 on unexpected error", async () => {
      Post.findById.mockRejectedValue(new Error("DB error"));
      await updatePost(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ─── deletePost ───────────────────────────────────────────────────────────────

  describe("deletePost", () => {
    let docForDelete;

    beforeEach(() => {
      req = { userId: AUTHOR_ID, params: { id: POST_ID } };
      docForDelete = { ...mockPost, author: AUTHOR_ID, deleteOne: jest.fn().mockResolvedValue({}) };
    });

    it("returns 400 when post id is not a valid ObjectId", async () => {
      req.params = { id: "not-valid" };
      await deletePost(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid post id" });
    });

    it("returns 404 when post not found", async () => {
      Post.findById.mockResolvedValue(null);
      await deletePost(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Post not found" });
    });

    it("returns 403 when user is not the author", async () => {
      Post.findById.mockResolvedValue({ ...docForDelete, author: OTHER_ID });
      await deletePost(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Not authorized" });
    });

    it("returns 200 on success", async () => {
      Post.findById.mockResolvedValue(docForDelete);
      await deletePost(req, res);
      expect(docForDelete.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it("returns 500 on unexpected error", async () => {
      Post.findById.mockRejectedValue(new Error("DB error"));
      await deletePost(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
