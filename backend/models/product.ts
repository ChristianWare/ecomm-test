import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: { type: [String], required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  sizes: [String],
  colors: [String],
  price: { type: Number, required: true },
  expense: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
