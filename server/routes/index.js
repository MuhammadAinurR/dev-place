const express = require('express');
const routes = express.Router();

const postsRouter = require('./postsRoutes');
const usersRouter = require('./usersRoutes');
const categoriesRouter = require('./categoriesRoutes');
const errorHandler = require('../utils/errorHandler');
const geminiRouter = require('./geminiRoutes');
const { getGithubTrending } = require('../controllers/githubTrending');


routes.use('/users', usersRouter);
routes.use('/posts', postsRouter);
routes.use('/gemini', geminiRouter);
routes.use('/categories', categoriesRouter);
routes.get('/github-trending', getGithubTrending);

routes.use(errorHandler)

module.exports = routes;