const express = require('express');
const geminiRouter = express.Router();
const { guide, codeConverter, componentGenerator, codeSolver } = require('../controllers/gemini');

geminiRouter.post('/guide', guide)
geminiRouter.post('/code-converter', codeConverter)
geminiRouter.post('/component-generator', componentGenerator)
geminiRouter.post('/code-solver', codeSolver)

module.exports = geminiRouter;
