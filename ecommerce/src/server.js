const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");

const { connectDB } = require("./config/db");
const { initializePassport } = require("./config/passport");
const routes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
initializePassport();
app.use(passport.initialize());

// Healthcheck
app.get("/", (_req, res) => {
  res.send("🚀 API ecommerce lista");
});

// Rutas API
app.use("/api", routes);

// Conexión a MongoDB y arranque del server
connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
});
