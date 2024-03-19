const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ckodi2000:87piWUC5qWfM9xyY@cluster0.1lbaweh.mongodb.net/driverDispatcherDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const formDataSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  licenseNumber: { type: String, unique: true }, // Set licenseNumber to be unique
  vehicleType: String,
  availabilityStatus: String,
  rating: Number
});

const FormData = mongoose.model('FormData', formDataSchema);

app.post('/api/submitFormData', async (req, res) => {
  try {
    const { licenseNumber } = req.body;
    const existingEntry = await FormData.findOne({ licenseNumber });
    if (existingEntry) {
      return res.status(400).json({ message: 'License number already exists.' });
    }

    const newFormData = new FormData(req.body);
    await newFormData.save();
    res.status(201).json(newFormData);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: 'License number already exists.' });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

app.get('/api/getFormData', async (req, res) => {
  try {
    const formDatas = await FormData.find().sort({ rating: -1 });
    res.status(200).json(formDatas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/deleteFormData/:id', async (req, res) => {
  try {
    const result = await FormData.findOneAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: 'The driver with the given ID was not found.' });
    }
    res.json(result);
  } catch (err) {
    console.error("Error during deletion:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.put('/api/updateFormData/:id', async (req, res) => {
  try {
    const { licenseNumber } = req.body;
    const driver = await FormData.findById(req.params.id);
    if (driver.licenseNumber !== licenseNumber) {
      const existingEntry = await FormData.findOne({ licenseNumber });
      if (existingEntry) {
        return res.status(400).json({ message: 'License number already exists.' });
      }
    }

    const result = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'The driver with the given ID was not found.' });
    }
    res.json(result);
  } catch (err) {
    console.error("Error during update:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.get('/api/getFormData/:id', async (req, res) => {
  try {
    const driver = await FormData.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/reportData', async (req, res) => {
  try {
    const totalDrivers = await FormData.countDocuments();
    const availableDrivers = await FormData.countDocuments({ availabilityStatus: 'available' });
    const carDrivers = await FormData.countDocuments({ vehicleType: 'car' });
    const bikeDrivers = await FormData.countDocuments({ vehicleType: 'bike' });
    const lorryDrivers = await FormData.countDocuments({ vehicleType: 'lorry' });

    res.status(200).json({
      totalDrivers,
      availableDrivers,
      carDrivers,
      bikeDrivers,
      lorryDrivers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
