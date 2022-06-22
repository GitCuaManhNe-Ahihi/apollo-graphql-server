const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
const connectDB = require("./config/connectMongoose.config");
const methodsHandleMongoose = require("./database/index");


dotenv.config();

//LOAD SCHEMA
const app = express();
const httpserver = http.createServer(express());
const typeDefs = require("./schema/index");
const resolvers = require("./resolver/index");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: httpserver })],
  context: ({ req }) => ({ methodsHandleMongoose, req }),
});

server.start().then(() => {
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app, path: "/graphql" });

  const port = process.env.PORT || 3001;

  app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/", (req, res) => {
    res.sendFile("views/index.html", { root: __dirname });
  });

  connectDB()
    .then(() => {
      app.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch((err) => console.log(err));
});
