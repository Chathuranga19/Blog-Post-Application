const express = require('express');
const router = express.Router();
const {
    addPost,
    getPosts,
    updatePost,
    deletePost,
    getPostById,
    getAuthors
} = require('../controllers/BlogPost.controller')

//@route GET api/post/all
//@desc GET all posts
router.get("/all", getPosts);

//@route POST api/post/all
//@desc add a post
router.post("/", addPost);

//@route PUT api/post/:id
//@desc update a post
router.put("/:id", updatePost);

//@route DELETE api/post/:id
//@desc delete a post
router.delete("/:id", deletePost);

//@route GET api/post/postById/:id
//@desc GET a post by Id
router.get("/:id", getPostById);

//@route GET api/post/all
//@desc GET all posts
router.get("/authors/all", getAuthors);

module.exports = router;