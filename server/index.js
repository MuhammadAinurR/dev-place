if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

module.exports = app;

// module.exports = {
//     apps: [{
//         name: "devPlace-server",
//         script: "./index.js",
//         env: {
//             JWT_SECRET: 'super-secret-code',
//             GITHUB_CLIENT_ID: 'Ov23liby8cjlxlqUTDba',
//             GITHUB_CLIENT_SECRET: '9746601b2f85aaf0d503621e2075c7c985c057e3',
//             GOOGLE_AUDIENCE: '307747605125-ipj32ju7dca41cr242o3qbc42a668h3g.apps.googleusercontent.com',
//             GEMINI_API_KEY: 'AIzaSyBizlceZsGFo4-CoXxcRl-ghY-1iF99Os8',

//             PORT: 80,
//             NODE_ENV: 'production',
//             DB_URL: 'postgresql://postgres.xcwekvotvtlsequybsax:Oaoc4t7TSEl5724m@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
//         }
//     }]
// }