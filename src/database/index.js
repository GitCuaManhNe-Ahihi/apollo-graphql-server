const Shop = require("../models/Shop");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Mode = require("../models/Mode");
const { createToken } = require("../util/auth");
const argon2 = require("argon2");
const mongoose = require("mongoose");


const methodsHandleMongoose = {
  getUsers: async () => await User.find().exec(),
  getUser: async (id) => await User.findById(id).exec(),
  getShops: async () => await Shop.find().exec(),
  getShop: async (id) => await Shop.findById(id).exec(),
  getProducts: async () => await Product.find(),
  getProduct: async (id) => await Product.findById(id).exec(),
  getProductsByIdMode: async (id) =>
    await Product.find({ modeId: id }).exec(),
  getProductsByIdShop: async (id) =>
    await Product.find({ shopId: id }).exec(),
  getProductsByCategory: async (ids) =>
    await Product.find({ id: { $in: ids } }).exec(),
  getCategory: async (id) => {
    return (await Category.find({userId:id.userId}).exec())[0];
  },
  getModes: async () => await Mode.find().exec(),
  getMode: async (id) => await Mode.findById(id).exec(),
  addUser: async (args) => {
    const { name, email, password,phoneNumber,address } = args;
    const hash = await argon2.hash(password);
    const data = await new User({ name, email, password: hash,phonenumber:phoneNumber,address }).save()
    await new Category({userId:data._id,productsId:[]}).save();
    return data;
  },
  addShop: async (args) => await new Shop(args).save(),
  addProduct: async (args) => await new Product(args).save(),
  addMode: async (args) => {
    return await new Mode(args).save();
  },
  login: async (args) => {
    const user = await User.findOne({ email: args.email });
    if (!user) {
      throw new Error("User not found");
    }
    const check = await argon2.verify(user.password, args.password);
    if (!check) {
      throw new Error("Password is incorrect");
    }
    const token = await createToken(user, "access");
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      accessToken: token,
      phonenumber:user.phonenumber,
      address:user.address
    };
  },
  changeUser: async (args) => {
    const {id, name,phonenumber,address } = args;
    const data = await User.findByIdAndUpdate(id,{name,phonenumber,address}).exec();
    return data;
  }
}

module.exports = methodsHandleMongoose
