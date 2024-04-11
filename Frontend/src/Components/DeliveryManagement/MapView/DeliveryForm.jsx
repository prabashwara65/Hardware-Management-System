import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify CSS

import axios from "axios";
import { Button, Card, CardContent, Typography, Grid, Container, Dialog, DialogTitle, DialogContent, DialogActions, Paper, TextField, Box, MenuItem } from "@mui/material";

const FormSide = ({ handleFetchData, sampleData }) => {
  const PaperStyle = { padding: "20px 30px", width: 400, marginTop: "20px", height: "420px" };
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const [shippingAddress, setShippingAddress] = useState('');
  const [selectVehicle, setSelectVehicle] = useState('');
  const [deliveryCost, setDeliveryCost] = useState('');
  const [estimateTime, setEstimateTime] = useState('');

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedVehicleData = sampleData.find(vehicle => vehicle.name === selectedVehicle);

    if (!selectedVehicleData) {
      setErrorMessage("Selected Vehicle is not available!");
    } else if (selectedVehicleData.availability === 'notAvailable') {
      setErrorMessage("Selected Vehicle is not available!");
    } else {
      console.log("Form data to be submitted:", {
        shippingAddress,
        selectedVehicle,
        deliveryCost,
        estimateTime
      });

      if (!Number.isInteger(parseInt(deliveryCost))) {
        toast.error('Delivery Cost must be an integer');
        return;
      }

      if (!Number.isInteger(parseInt(estimateTime))) {
        toast.error('Estimate Time must be an integer');
        return;
      }

      axios.put(`http://localhost:3001/updateVehicleAvailability/${selectedVehicleData._id}`, { availability: 'notAvailable' })
        .then(res => {
          console.log("Vehicle availability updated successfully!");
          toast.success("Delivery created successfully!");
          console.log("Response from server:", res.data);
          window.location.reload(); // Refresh the page

         
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={PaperStyle} sx={{ padding: 1, backgroundColor: "", borderRadius: 2, width: "80%", marginTop: "7px" }}>
        <h2>Delivery Information</h2>
        <form onSubmit={handleSubmit} action="/Dashboard">
          <TextField fullWidth
            label="Shipping Address"
            variant="standard"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)} />

          <TextField
            select
            fullWidth
            label="Select Vehicle"
            variant="standard"
            value={selectedVehicle}
            onChange={handleVehicleChange} >
            {sampleData.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.name}>{vehicle.name}</MenuItem>
            ))}
          </TextField>

          {errorMessage && <Typography color="error">{errorMessage}</Typography>}

          <TextField
            fullWidth
            label="Delivery Cost"
            variant="standard"
            value={deliveryCost}
            onChange={(e) => setDeliveryCost(e.target.value)}
            required />

          <TextField
            fullWidth
            label="Estimate Time"
            variant="standard"
            value={estimateTime}
            onChange={(e) => setEstimateTime(e.target.value)}
            required />

          <Button type="submit" variant="contained" sx={{ width: '100%', height: '35px', bgcolor: '#FFA500', marginTop: 3, borderRadius: 1 }}>Submit</Button>
          <container >
            <Button variant="outlined" sx={{ width: '45%', height: '35px', bgcolor: '', marginTop: 2, borderRadius: 1 }}>Order Data</Button>
            <Button onClick={handleFetchData} variant="outlined" sx={{ width: '45%', height: '35px', bgcolor: '', marginTop: 2, marginLeft: 4, borderRadius: 1 }}>Vehicle Data</Button>
          </container>

        </form>
      </Paper>
    </Grid>
  );
};

const Delivery_Cost_Calculation_Form = () => {
  const PaperStyle1 = { padding: "30px 30px", width: 400, margin: "15px 0px", height: "205px" }
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={PaperStyle1} sx={{ padding: 2, backgroundColor: "", borderRadius: 2, width: "80%", height: 300 }}>
        <h3>Delivery Cost Calculation</h3>
        <form>
          <TextField sx={{ width: '300px', height: '50px' }} label="Enter Total Distance" variant="standard" /> <br />
          <Button variant="contained" sx={{ width: '100%', height: '35px', bgcolor: '#FFA500', marginTop: 3, borderRadius: 1 }} >Test</Button>
        </form>
      </Paper>
    </Grid>
  );
};

const InfoForm = () => {
  const PaperStyle = { padding: "30px 30px", width: 400, margin: "5px 0px", height: "400px" }
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={PaperStyle} sx={{ paddingRight: 2, backgroundColor: "#ffffff", borderRadius: 2, width: "80%", height: 300, alignItems: "center" }}>
        <h2 >About our Services</h2>
        <br></br>
        <h6>At Laksiri Hardware, we pride ourselves on offering comprehensive and reliable delivery services tailored to meet the diverse needs of our clients. With a focus on efficiency, flexibility, and customer satisfaction, we strive to exceed expectations in every aspect of our operations.</h6>
        <Link to="/vehicleView" underline="none">
          <Button variant="contained" sx={{ width: '100%', height: '35px', bgcolor: '#FFA500', marginTop: 3, borderRadius: 1 }}>
            View Vehicles
          </Button>
        </Link>
        <Link to="/DeliveryView" underline="none">
          <Button variant="contained" sx={{ width: '100%', height: '35px', bgcolor: '#FFA500', marginTop: 3, borderRadius: 1 }}>
            View Deliveries
          </Button>
        </Link>
      </Paper>
    </Grid>
  );
};

const DeliveryForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [sampleData, setSampleData] = useState([]);

  const handleFetchData = () => {
    axios.get("http://localhost:3001/VehicleView")
      .then(res => {
        setSampleData(res.data); // Set the fetched data to sampleData
        setOpenDialog(true);
      })
      .catch(err => console.log(err));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <FormSide handleFetchData={handleFetchData} sampleData={sampleData} />
      </Grid>
      <Grid container spacing={2}>
        <Delivery_Cost_Calculation_Form />
      </Grid>
      <Grid container spacing={2}>
        <InfoForm />
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Vehicle Data Retrieved!</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {sampleData.map((vehicle) => (
              <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                <Card style={{ width: '180px', backgroundColor: vehicle.availability === 'notAvailable' ? 'red' : '#E3FDFD' }}>
                  <CardContent style={{ padding: '20px', width: '200px' }}>
                    <Typography variant="h3">{vehicle.id}</Typography>
                    <Typography variant="subtitle1">{vehicle.name}</Typography>
                    <Typography variant="body2">Model: {vehicle.model}</Typography>
                    <Typography variant="body2">Milage: {vehicle.millage}</Typography>
                    <Typography variant="body2">Status: {vehicle.availability}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer /> {/* Add ToastContainer */}
    </Container>
  );
};

export default DeliveryForm;
