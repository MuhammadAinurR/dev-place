const model = require('../utils/gemini');

const componentGenerator = async (req, res, next) => {
    const { input } = req.body;
    try {
        const prompt = `write me jsx component that create ${input} with tailwind for my react project. Give me code only!`;
        const result = await model.generateContent(prompt);

        return res.send(result.response.text())
    } catch (error) {
        next(error)
    }
}

const codeConverter = async (req, res, next) => {
    const { before, after, input } = req.body;
    try {
        const prompt = `change this code from ${before} programinglanguage into ${after} programing language. Code: ${input}. Give me code only!`;
        const result = await model.generateContent(prompt);

        return res.send(result.response.text())
    } catch (error) {
        next(error)
    }
}
const codeSolver = async (req, res, next) => {
    const { input, errorMessage } = req.body;
    try {
        const prompt = `my code = ${input}. error message = ${errorMessage}. explain why this erro can happen and give me solution`;
        const result = await model.generateContent(prompt);

        return res.send(result.response.text())
    } catch (error) {
        next(error)
    }
}

const guide = async (req, res, next) => {
    const { input } = req.body;
    try {
        const prompt = `write me a guide with markdown format. guide of ${input} from the start until finished`;
        const result = await model.generateContent(prompt);

        return res.send(result.response.text())
    } catch (error) {
        next(error)
    }
}

module.exports = { componentGenerator, codeConverter, guide, codeSolver }