const express = require('express');
const router = express.Router();
const LendedItem = require('../models/LendedItem');
const Item = require('../models/Item');

// API endpoint to create a new lended item
router.post('/', async (req, res) => {
  try {
    const { itemId, itemName, lenderName, daysForLend, oneDayPrice, totalPay } = req.body;

    // Find the item by its ID
    const item = await Item.findById(itemId);
    
    // Check if the item exists
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Decrease the quantity by 1
    item.quantity -= 1;

    // Save the updated item
    await item.save();

    // Create a new lended item
    const lendedItem = new LendedItem({
      itemId,
      itemName,
      lenderName,
      daysForLend,
      oneDayPrice,
      totalPay,
    });

    // Save the lended item
    const savedLendedItem = await lendedItem.save();
    res.json(savedLendedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to get all lended items
router.get('/', async (req, res) => {
  try {
    // Fetch all lended items from the database
    const lendedItems = await LendedItem.find();
    res.json(lendedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to update totalPay of a lended item
router.put('/:id/updateTotalPay', async (req, res) => {
  try {
    const { id } = req.params;
    const { totalPay } = req.body;

    // Find the lended item by ID and update totalPay
    const updatedItem = await LendedItem.findByIdAndUpdate(id, { totalPay }, { new: true });

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to delete a lended item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the lended item by ID and delete it
    await LendedItem.findByIdAndDelete(id);

    res.status(204).send(); // Send a success response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
