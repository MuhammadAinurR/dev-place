const { Op } = require('sequelize');
const { User, Category, Post, PostCategory } = require('../models');

const getPosts = async (req, res, next) => {
    const { category, search, myPosts } = req.query;
    try {
        let params = {
            include: [
                {
                    model: Category,
                    attributes: ['name', 'id'],
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

const getPostById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id, {
            include: {
                model: Category,
                attributes: ['name'],
                through: { attributes: [] }
            }
        })
        if (!post) throw { name: 'NotFound' };
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

const createPost = async (req, res, next) => {
    const { title, content, imgUrl, Categories } = req.body;
    console.log(req.body)
    const { id: userId } = req.user;
    try {
        const post = await Post.create({ title, content, imgUrl, userId });
        if (Categories && Categories.length > 0) {
            Categories.forEach(element => {
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

const editPost = async (req, res, next) => {
    const { id } = req.params;
    const { title, content, imgUrl, Categories } = req.body;
    const { id: userId } = req.user;
    try {
        const post = await Post.findByPk(id);
        if (!post) throw { name: 'NotFound' };
        await post.update({ title, content, imgUrl })
        res.status(200).json({ message: `success update ${post.title}` });
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

module.exports = { createPost, getPosts, getPostById, editPost, deletePost };