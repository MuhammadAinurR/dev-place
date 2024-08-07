const express = require('express');
const { getCategories } = require('../controllers/category');
const categoriesRouter = express.Router();

categoriesRouter.get('/', getCategories);

module.exports = categoriesRouter;
