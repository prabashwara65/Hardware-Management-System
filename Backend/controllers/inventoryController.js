const Inventory = require('../models/inventoryModel')
const mongoose = require('mongoose')

// get all product data
const getAllProducts = async (req, res) => {
    
    const allInventorydata = await Inventory.find({}).sort({createdAt: -1})

    res.status(200).json(allInventorydata)
}

// get a single product data
const getProduct = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the product'})
    }
    const product = await Inventory.findById(id)

    if(!product){
        return res.status(404).json({error: 'Cannot find the product'})
    }
    res.status(200).json(product)
}

// add new product
const addProduct = async (req, res) =>{

    const {name, category, price, quantity} = req.body

    try{
        const inventorydata = await Inventory.create({name, category, price, quantity})
        res.status(200).json(inventorydata)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete a product
const deleteProduct = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the product'})
    }

    const product = await Inventory.findByIdAndDelete({_id: id})

    if(!product){
        return res.status(404).json({error: 'Cannot find the product'})
    }
    res.status(200).json(product)

}

// update a product
const updateProduct = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Cannot find the product'})
    }

    const product = await Inventory.findByIdAndUpdate({_id: id},{...req.body})

    if(!product){
        return res.status(404).json({error: 'Cannot find the product'})
    }
    res.status(200).json(product)
}

module.exports = { getAllProducts, getProduct, addProduct, deleteProduct, updateProduct }