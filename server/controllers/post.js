const { User, Category, Post, PostCategory } = require('../models');

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
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
        });
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

const createPost = async (req, res, next) => {
    const { userId, title, content, imgUrl, categoryIds } = req.body;
    try {
        const post = await Post.create({ title, content, imgUrl, userId });
        if (categoryIds && categoryIds.length > 0) {
            categoryIds.forEach(element => {
                PostCategory.create({
                    PostId: post.id,
                    CategoryId: element
                })
            });
        }
        res.status(201).json({ message: 'Post created successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = { createPost, getPosts };