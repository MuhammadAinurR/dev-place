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

module.exports = {
    apps: [{
        name: "devPlace-server",
        script: "./index.js",
        env: {
            JWT_SECRET: 'super-secret-code',
            GITHUB_CLIENT_ID: 'Ov23liby8cjlxlqUTDba',
            GITHUB_CLIENT_SECRET: '9746601b2f85aaf0d503621e2075c7c985c057e3',
            GOOGLE_AUDIENCE: '307747605125-ipj32ju7dca41cr242o3qbc42a668h3g.apps.googleusercontent.com',
            GEMINI_API_KEY: 'AIzaSyBizlceZsGFo4-CoXxcRl-ghY-1iF99Os8',

            PORT: 80,
            NODE_ENV: 'production',
            DB_URL: 'postgresql://postgres.xcwekvotvtlsequybsax:Oaoc4t7TSEl5724m@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
        }
    }]
}