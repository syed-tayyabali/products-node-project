const express = require("express");
const { productRoute } = require("./src/routes/productRoutes.js");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Products")
  .then(() => console.log("connect to database"))
  .catch((err) => console.error("not connected to database", err));

const app = express();
app.use(express.json());

app.use("/products", productRoute);

app.listen(4000, () => {
  console.log("Express server listening on port 4000");
});
