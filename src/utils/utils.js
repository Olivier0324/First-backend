// util function to generate jwt token
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '60s',
  });
}
// export function
module.exports = {generateToken};