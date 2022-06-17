const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/connectMongoose.config");
const methodsHandleMongoose = require("./database/index");

dotenv.config();

//LOAD SCHEMA
const typeDefs = require("./schema/index");
const resolvers = require("./resolver/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ()=>({methodsHandleMongoose})
});

server.start().then(() => {
  const app = express();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 3001;

  app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use('/',(res,req)=>{
    res.sendFile(path.join(__dirname+'./views/index.html'))
  })

  connectDB().then(() => {
  app.listen(port, () => console.log(`Server started on port ${port}`));
  }).catch((err) => console.log(err));

});
