const { verifyToken } = require('../utils/jwt');
const { User } = require('../models')
async function authentication(req, res, next) {
    try {
        const access_token = req.headers.authorization;
        if (!access_token) throw { name: "Unauthenticated" };
        
        const [bearer, token] = access_token.split(" ");
        if (bearer !== 'Bearer') throw { name: "Unauthenticated" };

        const payload = verifyToken(token)
        const user = await User.findByPk(payload.id)
        if (!user) throw { name: "Unauthenticated" };
        req.user = {
            id: user.id
        }
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {
    authentication
}