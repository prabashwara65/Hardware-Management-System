// backend/routes/userItemList.js

const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// API endpoint to get all items for user item list
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
