const Shop = require("../models/Shop");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");

const  methodsHandleMongoose = {
  getUsers: async () => await User.find().exec(),
  getUser: async (id) => await User.findById(id).exec(),
  getShops: async () => await Shop.find().exec(),
  getShop: async (id) => await Shop.findById(id).exec(),
  getProducts: async () => await Product.find(),
  getProduct: async (id) => await Product.findById(id).exec(),
  getProductsByCategory: async (ids) => await Product.find({ id:{ $in: ids } }),
  getCategories: async () => await Category.find().exec(),
  getCategory: async (id) => await Category.findById(id).exec(),
  addUser: async (args) => await new User(args).save(),
  addShop: async (args) => await new Shop(args).save(),
  addProduct: async (args) => await new Product(args).save(),
  addCategory: async (args) => await new Category(args).save(),
}

module.exports = methodsHandleMongoose;
