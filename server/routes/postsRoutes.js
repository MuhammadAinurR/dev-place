const express = require('express');
const { createPost, getPosts } = require('../controllers/post');
const { authentication } = require('../middlewares/auth');
const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.use(authentication)
postsRouter.post('/', createPost);

module.exports = postsRouter;
