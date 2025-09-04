const { Router } = require("express");
const { register, login, current } = require("../controllers/session.controller");
const { requireCurrent } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Valida token y devuelve datos del usuario (estrategia "current")
router.get("/current", requireCurrent, current);

module.exports = router;
