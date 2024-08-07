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
            audience: '307747605125-ipj32ju7dca41cr242o3qbc42a668h3g.apps.googleusercontent.com'
        })
        const { email, name: username } = ticket.getPayload()
        const password = Math.random().toString();
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: { username, email, password }
        });
        const access_token = signToken({ id: user.id });
        res.status(200).json({ message: "Logged in as " + user.email, access_token, email: user.email, username: user.username })
    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        await User.create({ username, email, password });
        res.status(200).json({ message: 'success create account' })
    } catch (error) {
        next(error);
    }
}

module.exports = { getUsers, login, googleLogin, register };