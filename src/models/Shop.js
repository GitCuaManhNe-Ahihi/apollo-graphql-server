const moogose = require("mongoose");
const Schema = moogose.Schema;

const ShopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  email: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  address:{
    type:String,
  },
  userId:{
    type: Schema.Types.ObjectId
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

module.exports = moogose.model("Shop", ShopSchema);
