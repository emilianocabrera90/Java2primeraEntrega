const service = require("../services/user.service");

async function getAll(req, res) {
  const users = await service.listUsers();
  res.json({ status: "success", users });
}

async function getOne(req, res) {
  const user = await service.getUserById(req.params.uid);
  if (!user) return res.status(404).json({ status: "error", message: "User not found" });
  res.json({ status: "success", user });
}

async function create(req, res) {
  try {
    const created = await service.createUser(req.body);
    res.status(201).json({ status: "success", user: created });
  } catch (err) {
    const code = err.message.includes("Email already in use") ? 409 : 500;
    res.status(code).json({ status: "error", message: err.message });
  }
}

async function update(req, res) {
  const updated = await service.updateUser(req.params.uid, req.body);
  if (!updated) return res.status(404).json({ status: "error", message: "User not found" });
  res.json({ status: "success", user: updated });
}

async function remove(req, res) {
  const ok = await service.deleteUser(req.params.uid);
  res.json({ status: "success", deleted: ok });
}

module.exports = { getAll, getOne, create, update, remove };
