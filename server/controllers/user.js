const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models')
const { comparePassword } = require('../utils/bcrypt');
const { signToken } = require('../utils/jwt');
const client = new OAuth2Client();

const getUsers = async (req, res) => {
    res.send('get users');
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email) throw { name: "EmailIsRequired" };
        if (!password) throw { name: "PasswordIsRequired" };

        const user = await User.findOne({ where: { email: email } });
        if (!user) throw { name: "InvalidEmailOrPassword" };
        const isPasswordValid = comparePassword(password, user.password);

        if (!isPasswordValid) throw { name: "InvalidEmailOrPassword" };

        const access_token = signToken({ id: user.id });
        res.status(200).json({ access_token, email: user.email, role: user.role, username: user.username, userId: user.id, message: 'login success' });
    } catch (error) {
        next(error)
    }
}

const googleLogin = async (req, res, next) => {
    const { googleToken } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_AUDIENCE
        })
        const { email, name: username } = ticket.getPayload()
        const password = Math.random().toString();
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { username, email, password }
        });
        const access_token = signToken({ id: user.id });
        res.status(200).json({ message: "Logged in as " + user.username, access_token, email: user.email, username: user.username })
    } catch (error) {
        next(error)
    }
}

const githubLogin = async (req, res, next) => {
    const { githubToken } = req.body;
    try {
        // get github token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: githubToken,
            }),
        });

        const tokenData = await tokenResponse.json();
        const accessToken = await tokenData.access_token;

        // get github email from token
        const userDataResponse = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${accessToken}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        const userData = await userDataResponse.json()

        // create jwt token from email
        const { email, name: username } = userData
        const password = Math.random().toString();
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { username, email, password }
        });
        const access_token = signToken({ id: user.id });
        res.status(200).json({ message: "Logged in as " + user.username, access_token, email: user.email, username: user.username })
    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        await User.create({ username, email, password });
        res.status(201).json({ message: 'success create account' })
    } catch (error) {
        next(error);
    }
}

module.exports = { getUsers, login, githubLogin, googleLogin, register };