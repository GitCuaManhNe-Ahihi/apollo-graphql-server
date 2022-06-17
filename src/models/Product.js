const moogose = require("mongoose");
const Schema = moogose.Schema;

const ProductSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  shopId: {type: Schema.Types.ObjectId, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

module.exports = moogose.model("Product", ProductSchema);
