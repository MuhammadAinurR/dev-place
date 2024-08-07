const express = require('express');
const routes = express.Router();

const postsRouter = require('./postsRoutes');
const usersRouter = require('./usersRoutes');
const categoriesRouter = require('./categoriesRoutes');

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/posts', postsRouter);

module.exports = routes;