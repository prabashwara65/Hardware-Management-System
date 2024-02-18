
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  imageUrl: String,
  quantity: Number,
  oneDayPrice: Number 
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;   
 