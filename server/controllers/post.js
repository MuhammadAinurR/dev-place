const { Op } = require('sequelize');
const { User, Category, Post, PostCategory } = require('../models');

const getPosts = async (req, res, next) => {
    const { category, search, myPosts } = req.query;
    try {
        let params = {
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                    through: { attributes: [] }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [['createdAt', 'DESC']]
        }
        if (search) params.where = { title: { [Op.iLike]: `%${search}%` } }
        if (category) params.include[0].where = { id: category }
        if (myPosts) params.include[1].where = { id: req.user.id }
        const posts = await Post.findAll(params);
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

const createPost = async (req, res, next) => {
    const { title, content, imgUrl, categoryIds } = req.body;
    console.log(req.body)
    const { id: userId } = req.user;
    try {
        const post = await Post.create({ title, content, imgUrl, userId });
        if (categoryIds && categoryIds.length > 0) {
            categoryIds.forEach(element => {
                PostCategory.create({
                    PostId: post.id,
                    CategoryId: +element
                })
            });
        }
        res.status(201).json({ message: 'Post created successfully' })
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) throw { name: 'NotFound' };
        await post.destroy();
        res.status(200).json({ message: `${post.title} success to delete` });
    } catch (error) {
        next(error);
    }
}

module.exports = { createPost, getPosts, deletePost };