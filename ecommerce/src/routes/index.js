const { Router } = require("express");
const sessions = require("./session.routes");
const users = require("./user.routes");

const router = Router();

router.use("/sessions", sessions);
router.use("/users", users);

module.exports = router;
