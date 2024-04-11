import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import jsPDF from 'jspdf';

import VihicleViewCss from './VehicleView.module.css';

function VehicleDetails() {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null); // Track the selected delivery
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

    useEffect(() => {
        axios.get("http://localhost:3001/VehicleView")
            .then(res => {
                setVehicles(res.data);
            })
            .catch(err => console.log(err));
    }, []);

  
    const downloadAsPdf = (vehicle) => {
        const pdf = new jsPDF();

        // Add background color
        pdf.setFillColor("#F0F0F0");
        pdf.rect(0, 0, 110, 297, 'F'); // A4 page size

        // Add title
        pdf.setTextColor("#000000");
        pdf.setFontSize(18);
        pdf.text("Vehicle Details", 105, 20, { align: 'center' });

        // Add vehicle details
        pdf.setFontSize(12);
        pdf.text(`Name: ${vehicle.name}`, 10, 40);
        pdf.text(`Model: ${vehicle.model}`, 10, 50);
        pdf.text(`Millage: ${vehicle.millage}`, 10, 60);
        pdf.text(`Status: ${vehicle.availability}`, 10, 70);

        // Add footer
        pdf.setTextColor("#808080");
        pdf.setFontSize(10);
        pdf.text("Generated by YourApp", 105, 280, { align: 'center' });

        pdf.save("vehicle-details.pdf");
    };


    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleDelete = (id) => {

        axios.delete(`http://localhost:3001/VehicleDelete/${selectedVehicle}`)
            .then(() => {
                setVehicles(vehicles.filter(vehicles => vehicles._id !== id));
                console.log(selectedVehicle)
                //setOpenDialog(false); // Close the dialog after deletion
                //window.location.reload(); // Reload the page

            })
            .catch(err => console.log(err));

    };

    return (
        <div className={VihicleViewCss.body}>
            <Paper className={VihicleViewCss.paper}>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Millage</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredVehicles.map(vehicle => (
                            <TableRow key={vehicle._id}>
                                <TableCell>{vehicle.name}</TableCell>
                                <TableCell>{vehicle.model}</TableCell>
                                <TableCell>{vehicle.millage}</TableCell>
                                <TableCell>{vehicle.availability}</TableCell>
                                <TableCell>
                                    <Link to={`/VehicleUpdateDelete/${vehicle._id}`} style={{ textDecoration: 'none', marginRight: '10px' }}>
                                        <Button variant="contained" color="primary">Update</Button>
                                    </Link>
                                    <Button
                                        style={{ textDecoration: 'none', marginRight: '10px', backgroundColor: "#D875C7" }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setSelectedVehicle(vehicle._id); // Set the selected delivery
                                            setOpenDialog(true); // Open the dialog for confirmation
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Button style={{ textDecoration: 'none', marginRight: '10px', backgroundColor: "#6196A6" }} variant="contained" onClick={() => downloadAsPdf(vehicle)}>Download as PDF</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this Vehicle?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default VehicleDetails;
