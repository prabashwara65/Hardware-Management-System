import React, { useState, useEffect } from "react";
import LendedItemCard from "./LendedItemCard";
import UpdateForm from "../Form-update/UpdateForm";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

const LendedItemList = () => {
  const [lendedItems, setLendedItems] = useState([]);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchLendedItems(); // Fetch lended items when the component mounts
  }, []);

  // Function to fetch lended items from the backend
  const fetchLendedItems = () => {
    axios
      .get(`http://localhost:8000/lendedItems`)
      .then((response) => {
        setLendedItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lended items:", error);
      });
  };

  // Function to handle marking item as received
  function onItemReceived(item) {
    // Send a DELETE request to delete the item
    axios
      .delete(`http://localhost:8000/lendedItems/${item._id}`)
      .then((response) => {
        console.log("Item received:", response.data);
        // Remove the item from the list
        const updatedItems = lendedItems.filter((i) => i._id !== item._id);
        setLendedItems(updatedItems);
      })
      .catch((error) => {
        console.error("Error marking item as received:", error);
      });
  }

  // Function to handle extending time
  function onExtendTime(item) {
    setUpdateFormOpen(true);
    setSelectedItem(item);
  }

  // Function to close the Update Form modal
  const closeUpdateForm = () => {
    setUpdateFormOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <h2>Rented Items List</h2>

      {/* Check if lendedItems is an array before mapping */}
      {Array.isArray(lendedItems) &&
        lendedItems.map((item) => (
          <LendedItemCard
            key={item._id}
            item={item}
            onExtendTime={() => onExtendTime(item)}
            onItemReceived={() => onItemReceived(item)} // Attach onItemReceived function to the button
          />
        ))}

      {/* Update Form Modal */}
      {isUpdateFormOpen && selectedItem && (
        <UpdateForm
          isOpen={isUpdateFormOpen}
          onClose={closeUpdateForm}
          item={selectedItem}
          onSave={(formData) => {
            // After saving the updated data, fetch the updated lended items
            fetchLendedItems();
            closeUpdateForm();
          }}
        />
      )}

      {/* Add button to navigate to home page */}
      <Link to="/rentalService">
        <Button variant="contained" color="primary">
          Go to Item List
        </Button>
      </Link>
    </div>
  );
};

export default LendedItemList;
