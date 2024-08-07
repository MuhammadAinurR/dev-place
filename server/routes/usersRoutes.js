const express = require('express');
const { getUsers, login, register, googleLogin, githubLogin } = require('../controllers/user');
const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/login', login);
usersRouter.post('/google-login', googleLogin);
usersRouter.post('/github-login', githubLogin);
usersRouter.post('/register', register);

module.exports = usersRouter;
