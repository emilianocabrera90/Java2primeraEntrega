const User = require("../dao/models/User.model");
const { createHash, isValidPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

async function register(req, res) {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ status: "error", message: "Email already in use" });

    const user = await User.create({
      first_name,
      last_name,
      email,
      age: age ?? null,
      password: createHash(password), // bcrypt.hashSync
      role: role || "user",
    });

    const token = generateToken(user);
    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({ status: "success", token, user: safeUser });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ status: "error", message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: "error", message: "Invalid credentials" });

    const ok = isValidPassword(password, user.password);
    if (!ok) return res.status(401).json({ status: "error", message: "Invalid credentials" });

    const token = generateToken(user);
    const { password: _, ...safeUser } = user.toObject();
    return res.json({ status: "success", token, user: safeUser });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

function current(req, res) {
  // req.user viene de Passport (ya sanitizado)
  return res.json({ status: "success", user: req.user });
}

module.exports = { register, login, current };
