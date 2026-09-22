const express = require("express");
const router = express.Router();

//import controller
const { dummyLink, likePost, unlikePost } = require("../controllers/likeController");
const { createComment } = require("../controllers/commentController");
const { createPost, getAllPosts } = require("../controllers/postController");

//define API routes
router.get("/dummyroute", dummyLink);
router.post("/comments/create", createComment);  //path to controller map   post type request
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

module.exports = router;