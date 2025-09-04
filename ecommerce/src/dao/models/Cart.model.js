const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
  {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Cart", CartSchema);
