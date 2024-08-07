if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, () => console.log(`server is running on http://localhost:${port}`));