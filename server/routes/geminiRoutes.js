const express = require('express');
const geminiRouter = express.Router();
const { guide, codeConverter, componentGenerator } = require('../controllers/gemini');

geminiRouter.post('/guide', guide)
geminiRouter.post('/code-converter', codeConverter)
geminiRouter.post('/component-generator', componentGenerator)

module.exports = geminiRouter;
