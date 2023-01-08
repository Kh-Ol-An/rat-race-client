const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
    generatesTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '4h' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const foundToken = await tokenModel.findOne({ user: userId });
        if (foundToken) {
            foundToken.refreshToken = refreshToken;
            return foundToken.save();
        }

        return await tokenModel.create({ user: userId, refreshToken });
    }
}

module.exports = new TokenService();
