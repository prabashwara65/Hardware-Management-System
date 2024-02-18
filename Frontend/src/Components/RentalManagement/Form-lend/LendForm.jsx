// LendForm.jsx
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import Modal from "react-modal";
import axios from "axios";

const LendForm = ({
  isOpen,
  onClose,
  onSave,
  selectedItemId,
  selectedItemName,
  selectedItemOneDay,
}) => {
  const [lenderName, setLenderName] = useState("");
  const [daysForLend, setDaysForLend] = useState("");
  const [oneDayPrice, setOneDayPrice] = useState("");

  // Calculate total pay based on days and one day price
  const totalPay = daysForLend * selectedItemOneDay;

  const formLendClick = async () => {
    // Perform validation
    if (!lenderName || !daysForLend) {
      // Display an error message or prevent form submission
      alert("Please fill out all fields");
      return;
    }

    // Create a lending object
    const lendingData = {
      itemId: selectedItemId,
      itemName: selectedItemName,
      lenderName,
      daysForLend,
      oneDayPrice: selectedItemOneDay,
      totalPay,
    };

    try {
      // Make a POST request to your backend API to save lending data
      const response = await axios.post(
        `http://localhost:8000/lendedItems`,
        lendingData
      );

      // If the request is successful, you can perform additional actions
      console.log("Lending data saved:", response.data);

      // Call the onSave prop (if needed)
      onSave(lendingData);
    } catch (error) {
      // Handle errors, such as displaying an alert
      console.error("Error saving lending data:", error);
    }

    // Close the form
    onClose();
  };

  const handleCancelClick = () => {
    // Close the form without saving
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Lend Form Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: "auto",
          margin: "auto",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          position: "absolute",
        },
      }}
    >
      <div>
        <Typography variant="h5" gutterBottom>
          Rental Form
        </Typography>
        <TextField
          label="Item Name"
          value={selectedItemName}
          disabled
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Item ID"
          value={selectedItemId}
          disabled
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Lender Name"
          value={lenderName}
          onChange={(e) => setLenderName(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Days for Lend"
          type="number"
          value={daysForLend}
          onChange={(e) => setDaysForLend(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="One Day Price"
          type="number"
          value={selectedItemOneDay}
          onChange={(e) => setOneDayPrice(e.target.value)}
          fullWidth
          disabled
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Total Pay"
          value={totalPay}
          disabled
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={formLendClick}>
          Lend
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginLeft: 2 }}
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default LendForm;
