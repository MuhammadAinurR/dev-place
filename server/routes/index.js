const express = require('express');
const routes = express.Router();

const postsRouter = require('./postsRoutes');
const usersRouter = require('./usersRoutes');
const categoriesRouter = require('./categoriesRoutes');
const errorHandler = require('../utils/errorHandler');
const model = require('../utils/gemini');

routes.post('/gemini/component-generator', async (req, res) => {
    const { input } = req.body;
    const prompt = `write me jsx component that create ${input} with tailwind for my react project. Do not inclue ` + "```" + ' on first and last line';
    const result = await model.generateContent(prompt);

    return res.send(result.response.text())
})
routes.post('/gemini/code-converter', async (req, res) => {
    const { before, after, input } = req.body;
    const prompt = 
`
change this code from ${before} programinglanguage into ${after} programing language. 
Code: ${input}.
Give me code only, without ${"```"} at the star and the end of the result
`;
    const result = await model.generateContent(prompt);

    return res.send(result.response.text())
})

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/posts', postsRouter);

routes.use(errorHandler)

module.exports = routes;