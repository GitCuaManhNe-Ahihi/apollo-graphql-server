const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    unique: true,
  },
  productsId:{
    type: [Schema.Types.ObjectId],
  }
})

module.exports = mongoose.model("Category", CategorySchema);
