const passport = require("passport");

// Autenticación vía Passport-JWT
const requireAuth = passport.authenticate("jwt", { session: false });

/**
 * Validación rápida de token para /current con estrategia "current"
 * (idéntica a jwt, solo cambia el nombre para la consigna).
 */
const requireCurrent = passport.authenticate("current", { session: false });

module.exports = { requireAuth, requireCurrent };
