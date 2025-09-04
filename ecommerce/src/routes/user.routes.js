const { Router } = require("express");
const ctrl = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = Router();

/**
 * CRUD de usuarios.
 * Por defecto lo protegemos para ADMIN (puede ajustarse a tus necesidades).
 */
router.get("/", requireAuth, requireRole("admin"), ctrl.getAll);
router.get("/:uid", requireAuth, requireRole("admin"), ctrl.getOne);
router.post("/", requireAuth, requireRole("admin"), ctrl.create);
router.put("/:uid", requireAuth, requireRole("admin"), ctrl.update);
router.delete("/:uid", requireAuth, requireRole("admin"), ctrl.remove);

module.exports = router;


const { Router } = require("express");
const ctrl = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");


