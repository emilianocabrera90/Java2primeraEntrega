const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    sub: user._id.toString(),
    role: user.role,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    cart: user.cart || null,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1h",
  });
}

module.exports = { generateToken };
