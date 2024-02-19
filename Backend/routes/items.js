// backend/routes/items.js

const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// API endpoint to get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to add a new item
router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to update an existing item
router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  try { 

    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true, // Return the updated item
      runValidators: true, // Run validation checks on the updated item
    });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(updatedItem); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to delete an existing item 
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to update an existing item
router.put('/:itemName/markReceived', async (req, res) => {
  const itemName = req.params.itemName;
  try { 
    // Find the item by itemName
    const item = await Item.findOne({ itemName });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Increase the quantity by 1
    item.quantity += 1;

    // Save the updated item
    const updatedItem = await item.save();

    res.json(updatedItem); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
