const express = require('express')

const { getAllLowStockProducts, addLowStockProduct, deleteLowStockProduct } = require('../controllers/lowStockController')

const router = express.Router()

// GET all products
router.get('/', getAllLowStockProducts)

// POST a new product
router.post('/', addLowStockProduct)

// DELETE a product
router.delete('/:id', deleteLowStockProduct)

module.exports = router