const { sequelize } = require('../models');
const { hashPassword } = require('./bcrypt');
const { queryInterface } = sequelize;

const userAccount = {
    email: "nea@mail.com",
    password: "nea1234"
}
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIzMTcyMzE0fQ.Q3MYutP3hejDnpJJXl7or8obBYGiWD4zIRwNDyTLc94'

const addUsers = async () => {
    try {
        await queryInterface.bulkInsert('Users', [
            {
                email: userAccount.email,
                password: hashPassword(userAccount.password),
                username: 'Nea',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    } catch (error) {
        console.log(error)
    }
}
const deleteUsers = async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
}

const addCategories = async () => {
    await queryInterface.bulkInsert('Categories', [
        {
            name: "html",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "css",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
}

const deleteCategories = async () => {
    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
}

const addArticles = async () => {
    try {
        await queryInterface.bulkInsert('Posts', [
            {
                userId: 1,
                title: "Exploring Express and Sequelize",
                content: "This post explains how to integrate Express with Sequelize.",
                imgUrl: "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/29e8e71e34d3a45b48e3d34771a907d5?_a=AQAEuiZ",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    } catch (error) {
        console.log(error)
    }
}

const seedData = async () => {
    await addUsers();
    await addCategories();
    await addArticles();
}

const cleanupData = async () => {
    await deleteUsers();
    await deleteCategories();
}

module.exports = {
    seedData,
    cleanupData,
    userToken,
    userAccount
}