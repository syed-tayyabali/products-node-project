const { v4 } = require("uuid");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const productsSchema = new mongoose.Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const products = mongoose.model("Products_tb", productsSchema, "Products_tb");

module.exports.productsModel = products;
