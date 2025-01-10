const { Router } = require("express");
const { ProductsRepository } = require("../repository/ProductsRepository.js");

const productRoute = Router();
const productsRepository = new ProductsRepository();

productRoute.post("/", async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    console.log(name, description, quantity, price);
    await productsRepository.create({ name, description, quantity, price });
    return res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

productRoute.get("/", async (req, res) => {
  try {
    const allProducts = await productsRepository.getAllProducts();
    res.status(200).send(allProducts);
  } catch (e) {
    res.status(400).send(e);
  }
});

productRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await productsRepository.deleteProduct({ id });
    res.status(200).send();
  } catch (e) {
    return res.status(404).json({ error: "Unexpected Error" });
  }
});

productRoute.put("/", async (req, res) => {
  try {
    const { _id, name, description, quantity, price } = req.body;
    const updatedProduct = await productsRepository.update({
      _id,
      name,
      description,
      quantity,
      price,
    });
    return res.status(201).json(updatedProduct);
  } catch (e) {
    return res.status(404).json({ error: "Unexpected Error" });
  }
});

productRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await productsRepository.getByProductId({ id });
    return res.status(200).json(productById);
  } catch (e) {
    return res.status(404).json({ error: "Unexpected Error" });
  }
});

module.exports.productRoute = productRoute;
