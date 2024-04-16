<<<<<<< HEAD
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SupplierSchema = new Schema({
  name: {
    type: String,
    //required: true
  },
  contact: {
    phone: String,
    email: String,
    address: String
  },
  productsSupplied: [{
    name: String,
    category: String 
  }],
  paymentTerms: String,
  orderHistory: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    orderDate: Date,
    
  }],
  performanceMetrics: {
    onTimeDelivery: Number,
    productQuality: Number,
    responsiveness: Number,
    
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Supplier', SupplierSchema);


=======
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SupplierSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    phone: String,
    email: String,
    address: String
  },
  productsSupplied: [{
    name: String,
    category: String 
  }],
  paymentTerms: String,
  orderHistory: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    orderDate: Date,
    
  }],
  performanceMetrics: {
    onTimeDelivery: Number,
    productQuality: Number,
    responsiveness: Number,
    
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Supplier', SupplierSchema);


>>>>>>> 976cc275b49c8a4102df995a5812636b46677d9b
