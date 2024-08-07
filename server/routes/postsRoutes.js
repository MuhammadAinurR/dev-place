const express = require('express');
const { createPost } = require('../controllers/post');
const postsRouter = express.Router();

postsRouter.get('/', createPost);

module.exports = postsRouter;
