const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const createHash = (plainPassword) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(plainPassword, salt);
};

const isValidPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = { createHash, isValidPassword };
