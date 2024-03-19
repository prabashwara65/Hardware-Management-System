const LowStock = require('../models/lowStockModel')
const mongoose = require('mongoose')

// get all low stock product data
const getAllLowStockProducts = async (req, res) => {
    
    const allLowStockData = await LowStock.find({}).sort({createdAt: -1})

    res.status(200).json(allLowStockData)
}


// add low stock product
const addLowStockProduct = async (req, res) =>{

    const { lowStockProducts } = req.body;

    try{
        const lowStockData = await LowStock.insertMany(lowStockProducts);
        res.status(200).json(lowStockData)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete low stock product
const deleteLowStockProduct = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the product'})
    }

    const product = await LowStock.findByIdAndDelete({_id: id})

    if(!product){
        return res.status(404).json({error: 'Cannot find the product'})
    }
    res.status(200).json(product)

}

module.exports = { getAllLowStockProducts, addLowStockProduct, deleteLowStockProduct }