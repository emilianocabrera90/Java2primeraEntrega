const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name:  { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    age:        { type: Number, default: null },
    password:   { type: String, required: true }, // hash
    cart:       { type: Schema.Types.ObjectId, ref: "Cart", default: null },
    role:       { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
