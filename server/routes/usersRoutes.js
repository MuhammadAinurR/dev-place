const express = require('express');
const { getUsers } = require('../controllers/user');
const usersRouter = express.Router();

usersRouter.get('/', getUsers);

module.exports = usersRouter;
