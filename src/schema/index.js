const { gql} = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload
  type User {
    id: ID
    name: String
    email: String
    password: String
    phonenumber: String
    address: String
    accessToken: String
  }
  type Shop {
    id: ID
    name: String
    description: String
    email: String
    phonenumber: String
    address:String
    user: User
    createdAt: String
    products: [Product]
  }
  type Product {
    id: ID
    name: String
    price: Float
    description: String
    image: String
    storage: String
    made: String
    shop: Shop
    color: String
    mode: Mode
    same:[Product]
  }
  type Category {
    id: ID
    user: User
    products: [Product]
  }
  type Mode {
    id: ID
    name: String
    description: String
    url:String
    products: [Product]
  }

  # This is the query type, which will query for data
  type Query {
    products: [Product]
    product(id: ID!): Product
    category(id: ID!): Category
    shops: [Shop]
    shop(id: ID!): Shop
    users: [User]
    user(id: ID!): User
    modes: [Mode]
    mode(id: ID!): Mode
    getCategory(userId: ID): Category
    login(email: String!, password: String!): User
  }
  # This is the mutation type, which will be used to add data to the database
  type Mutation {
    addUser(
      name: String
      email: String
      password: String
      phoneNumber: String
      address: String
    ): User
    addShop(
      name: String
      description: String
      userId: ID
      email: String
      phonenumber: String
      address: String
    ): Shop
    addProduct(
      name: String
      price: Float
      color: String
      made: String
      description: String
      storage: String
      shopId: ID
      modeId: ID
      file:Upload
    ): Product
    addMode(name: String, description: String,file:Upload): Mode
    changeUser(
      name: String
      phonenumber: String
      address: String
      id: ID
    ): User
  }
`;

module.exports = typeDefs;
