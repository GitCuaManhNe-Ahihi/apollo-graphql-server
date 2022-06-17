const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  userID:{
    type: Schema.Types.ObjectId,
    unique: true,
  },
  productsID:{
    type: [Schema.Types.ObjectId],
  }
})

module.exports = mongoose.model("Category", CategorySchema);
