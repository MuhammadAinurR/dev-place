const { User, Category, Post, PostCategory } = require('../models');
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json(categories)
    } catch (error) {
        next(error)
    }
}

module.exports = { getCategories };