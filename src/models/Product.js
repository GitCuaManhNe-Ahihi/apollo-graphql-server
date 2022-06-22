const moogose = require("mongoose");
const Schema = moogose.Schema;

const ProductSchema = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  made: {type: String, required: true},
  storage: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  shopId: {type: Schema.Types.ObjectId, required: true},
  modeId: {type: Schema.Types.ObjectId, required: true},

})

module.exports = moogose.model("Product", ProductSchema);
