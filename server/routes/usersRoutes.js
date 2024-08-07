const express = require('express');
const { getUsers, login, register } = require('../controllers/user');
const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/login', login);
usersRouter.post('/register', register);

module.exports = usersRouter;
