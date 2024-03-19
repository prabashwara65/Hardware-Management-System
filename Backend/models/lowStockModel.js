const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lowStockSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{ timestamps: true })

lowStockSchema.index({name:1, category:1},{unique:true});

module.exports = mongoose.model('LowStock', lowStockSchema);
