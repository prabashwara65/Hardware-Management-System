const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: { 
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true 
    },
    quantityLimit: {
        type: Number,
        required: true 
    },
    img_URL: {
        type: String,
        required: true 
    }
},{ timestamps: true })

module.exports = mongoose.model('InventoryModelNew1', inventorySchema);
