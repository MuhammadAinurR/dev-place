const { User } = require('../models')
const { comparePassword } = require('../utils/bcrypt');
const { signToken } = require('../utils/jwt');
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

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        await User.create({ username, email, password });
        res.status(200).json({ message: 'success create account' })
    } catch (error) {
        next(error);
    }
}

module.exports = { getUsers, login, register };