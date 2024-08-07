const { Op } = require('sequelize');
const { User, Category, Post, PostCategory } = require('../models');

const createPost = async (req, res) => {
    try {
        res.send('hello')



    } catch (error) {

    }
}

module.exports = { createPost };