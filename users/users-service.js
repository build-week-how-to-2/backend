const constants = require('../config/constants.js');
const jwt = require('jsonwebtoken');

module.exports = {
    isValid,
    createToken
};

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
}

function createToken(user) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  
    const secret = constants.jwtSecret;
  
    const options = {
      expiresIn: '1d',
    }
  
    return jwt.sign(payload, secret, options)
}