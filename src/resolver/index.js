const authorization = require("../middleware/auth");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const path = require("path");
const uniqid = require("uniqid");
const { finished } = require("stream/promises");
const fs = require("fs");
const { v2 } = require("cloudinary");
v2.config({
  cloud_name: "hauimanhneahihi",
  api_key: "557771485155511",
  api_secret: "iSQlZvJpwqAse1tuEr2V9ZFy2dA",
});
const uploadCloud = async (file) => {
  return new Promise((resolve, reject) => {
    v2.uploader.upload(file, { upload_preset: "td17gyen" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const resolvers = {
  // Query
  Upload: GraphQLUpload,
  Query: {
    users: async (_, __, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getUsers(),
    user: async (_, { id }, { methodsHandleMongoose, req }) => {
      authorization(req);
      return await methodsHandleMongoose.getUser(id);
    },
    shops: async (_, __, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getShops(),
    shop: async (_, { id }, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getShop(id),
    products: async (_, __, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getProducts(),
    product: async (_, { id }, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getProduct(id),
    modes: async (_, __, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getModes(),
    mode: async (_, { id }, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getMode(id),
    getCategory: async (_, args, { methodsHandleMongoose, req }) => {
      authorization(req);
      return await methodsHandleMongoose.getCategory(args);
    },
    login: async (_, args, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.login(args),
  },
  Shop: {
    user: async ({ userId }, _, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getUser(userId),
    products: async ({ id }, _, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getProductsByIdShop(id),
  },
  Product: {
    shop: async ({ shopId }, _, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getShop(shopId),
    same: async ({ modeId }, _, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getProductsByIdMode(modeId),
  },
  Category: {
    user: async ({ userId }, _, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getUser(userId),
    products: async ({ productsId }, _, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getProductsByCategory(productsId),
  },
  Mode: {
    products: async ({ id }, _, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.getProductsByIdMode(id),
  },

  // Mutation
  Mutation: {
    addUser: async (_, args, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.addUser(args),
    addShop: async (_, args, { methodsHandleMongoose }) =>
      await methodsHandleMongoose.addShop(args),
    addProduct: async (_, args, { methodsHandleMongoose }) => {
      const { createReadStream, filename } = await args.file;
      const stream = createReadStream();
      const pathname = global.path + `/image/${uniqid() + filename}`;
      const out = require("fs").createWriteStream(pathname);
      stream.pipe(out);
      await finished(out);
      const { url } = await uploadCloud(pathname);
      fs.unlinkSync(pathname);
      const { name, storage, price, color, made, description, shopId, modeId } =
        args;
      return await methodsHandleMongoose.addProduct({
        name,
        price,
        color,
        made,
        description,
        shopId,
        modeId,
        storage,
        image: url,
      });
    },
    addMode: async (_, args, { methodsHandleMongoose }) => {
      const { createReadStream, filename } = await args.file;
      const stream = createReadStream();
      const pathname = global.path + `/image/${uniqid() + filename}`;
      const out = require("fs").createWriteStream(pathname);
      stream.pipe(out);
      await finished(out);
      const { url } = await uploadCloud(pathname);
      fs.unlinkSync(pathname);
      const { name, description } = args;
      return await methodsHandleMongoose.addMode({ name, description, url });
    },
    changeUser: async (_, args, { methodsHandleMongoose, req }) => {
      authorization(req);
      return await methodsHandleMongoose.changeUser(args);
    },
  },
};

module.exports = resolvers;
