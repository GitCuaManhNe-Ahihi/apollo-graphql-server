const resolvers = {
  // Query
  Query: {
    users: async (_,__,{methodsHandleMongoose}) => await methodsHandleMongoose.getUsers(),
    user: async (_,{id},{methodsHandleMongoose}) => await methodsHandleMongoose.getUser(id),
    shops: async (_,__,{methodsHandleMongoose}) => await methodsHandleMongoose.getShops(),
    shop: async (_,{id},{methodsHandleMongoose}) => await methodsHandleMongoose.getShop(id),
    products: async (_,__,{methodsHandleMongoose}) => await methodsHandleMongoose.getProducts(),
    product: async (_,{id},{methodsHandleMongoose}) => await methodsHandleMongoose.getProduct(id),
    categories: async (_,__,{methodsHandleMongoose}) => await methodsHandleMongoose.getCategories(),
    category: async (_,{id},{methodsHandleMongoose}) => await methodsHandleMongoose.getCategory(id),
  },
  Shop: {
    user: async ({userId},_,{methodsHandleMongoose}) => await methodsHandleMongoose.getUser(userId),
  },
  Product: {
    shop: async ({shopId},_,{methodsHandleMongoose}) =>  await methodsHandleMongoose.getShop(shopId),
  },
  Category: {
    products: ({productsId},_,{methodsHandleMongoose}) => methodsHandleMongoose.getProductsByCategory(productsId),
    user: async ({userId},_,{methodsHandleMongoose}) => await methodsHandleMongoose.getUser(userId),
  },
  // Mutation
  Mutation: {
    addUser: async (_,args,{methodsHandleMongoose}) =>await methodsHandleMongoose.addUser(args),
    addShop: async (_,args,{methodsHandleMongoose}) => await methodsHandleMongoose.addShop(args),
    addProduct:async (_,args,{methodsHandleMongoose}) => await methodsHandleMongoose.addProduct(args),
    addCategory:async (_,args,{methodsHandleMongoose}) => await methodsHandleMongoose.addCategory(args),
  },
};

module.exports = resolvers;
