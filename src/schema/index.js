const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
  }
  type Shop {
    id: ID
    name: String
    description: String
    image: String
    user: User
    createdAt: String
    updatedAt: String
  }
  type Product {
    id: ID
    name: String
    price: Float
    description: String
    image: String
    shop: Shop
    createdAt: String
    updatedAt: String
  }
  type Category {
    id: ID
    user: User
    products: [Product]
  }

  # This is the query type, which will query for data
  type Query {
    products: [Product]
    product(id: ID!): Product
    categories: [Category]
    category(id: ID!): Category
    shops: [Shop]
    shop(id: ID!): Shop
    users: [User]
    user(id: ID!): User
  }
  # This is the mutation type, which will be used to add data to the database
  type Mutation {
    addUser(name: String, email: String, password: String): User
    addShop(name: String, description: String, image: String, userId: ID): Shop
    addProduct(
      name: String
      price: Float
      description: String
      image: String
      shopId: ID
    ): Product
    addCategory(userId: ID, productsId: [ID]): Category
  }
`;

module.exports = typeDefs;
