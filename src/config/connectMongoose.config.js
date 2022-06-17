const mongoose = require("mongoose");

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB Connected");
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(false);
      });
  });
};

module.exports = connectDB;
