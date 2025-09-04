const User = require("../dao/models/User.model");
const { createHash } = require("../utils/bcrypt");

async function listUsers() {
  return User.find().select("-password").lean();
}

async function getUserById(id) {
  return User.findById(id).select("-password").lean();
}

async function createUser(data) {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new Error("Email already in use");
  const user = await User.create({
    ...data,
    password: createHash(data.password), // bcrypt.hashSync
  });
  const { password, ...safe } = user.toObject();
  return safe;
}

async function updateUser(id, data) {
  if (data.password) data.password = createHash(data.password);
  const updated = await User.findByIdAndUpdate(id, data, { new: true })
    .select("-password")
    .lean();
  return updated;
}

async function deleteUser(id) {
  await User.findByIdAndDelete(id);
  return true;
}

module.exports = { listUsers, getUserById, createUser, updateUser, deleteUser };
