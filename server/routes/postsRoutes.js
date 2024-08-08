const express = require('express');
const { createPost, getPosts, deletePost } = require('../controllers/post');
const { authentication } = require('../middlewares/auth');
const postsRouter = express.Router();

postsRouter.use(authentication)
postsRouter.get('/', getPosts);
postsRouter.post('/', createPost);
postsRouter.delete('/:id', deletePost)

module.exports = postsRouter;
