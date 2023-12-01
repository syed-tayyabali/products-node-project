const { productsModel } = require("../model/Product.js");

class ProductsRepository {
  //create a new Product
  async create({ name, description, quantity, price }) {
    const productAlreadyExist = await productsModel.findOne({ name });

    if (productAlreadyExist)
      return res.status(404).json({ error: "product already exists" });

    let products = new productsModel({
      name,
      description,
      quantity,
      price,
      created_at: new Date(),
    });

    await products.save();
  }

  //update product
  async update({ _id, name, description, quantity, price }) {
    let productExist = await productsModel.findById({ _id });

    if (!productExist)
      return res.status(404).json({ error: "Product not found" });

    productExist.description = description;
    productExist.name = name;
    productExist.quantity = quantity;
    productExist.price = price;
    productExist.updated_at = new Date();

    await productExist.save();
    return productExist;
  }

  // fetch all products
  async getAllProducts() {
    const allProducts = await productsModel.find();
    return allProducts;
  }

  // delete product
  async deleteProduct({ id }) {
    await productsModel.deleteOne({ _id: id });
  }
}

module.exports.ProductsRepository = ProductsRepository;
