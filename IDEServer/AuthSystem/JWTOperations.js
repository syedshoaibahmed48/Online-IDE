const jwt = require('jsonwebtoken');

const signToken = ( userid, username) => {
    return jwt.sign({ userid, username }, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = {
    signToken,
    verifyToken,
};