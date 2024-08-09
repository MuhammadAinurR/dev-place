const express = require('express');
const { createPost, getPosts, deletePost, getPostById, editPost } = require('../controllers/post');
const { authentication } = require('../middlewares/auth');
const postsRouter = express.Router();

postsRouter.use(authentication)
postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPostById)
postsRouter.put('/:id', editPost)
postsRouter.post('/', createPost);
postsRouter.delete('/:id', deletePost)

module.exports = postsRouter;
