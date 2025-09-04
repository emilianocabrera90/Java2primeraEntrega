const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  }
}

module.exports = { connectDB };
