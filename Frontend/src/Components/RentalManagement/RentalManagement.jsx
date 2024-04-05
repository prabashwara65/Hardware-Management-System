import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./searchBar/searchBar";
import ProductList from "./ProductList/ProductList";
import LendForm from "./Form-lend/LendForm";
import Modal from "react-modal";
import { Button } from "@mui/material";
import LendedItemsList from "./lendedItem/LendedItemList";
import AddNewItemForm from "./Form-addItem/AddNewItemForm";
import axios from "axios";
import UpdateItemForm from "./UpdateItemForm/UpdateItemForm";
import ItemCard from "./ItemCard/ItemCard";
import Sidebar from "../Dashboard/Dashboard_Sidebar";
import "./RentalManagement.css";

Modal.setAppElement(document.body);

function RentalManagement() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLendFormOpen, setLendFormOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [selectedItemOneDay, setSelectedItemOneDay] = useState(null);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isAddNewItemFormOpen, setAddNewItemFormOpen] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/items`);
      setItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onUpdateItemClick = (item) => {
    setSelectedItem(item);
    setUpdateFormOpen(true);
  };

  function handleLendClick(itemId, itemName, oneDayPrice) {
    setSelectedItemId(itemId);
    setSelectedItemName(itemName);
    setSelectedItemOneDay(oneDayPrice);
    setLendFormOpen(true);
  }

  function handleSaveLendingData(lendingData) {
    console.log("Saving lending data:", lendingData);
    setLendFormOpen(false);
  }

  function handleCloseModal() {
    setLendFormOpen(false);
  }

  const handleExtendTime = (item) => {
    console.log(`Extending time for item: ${item.name}`);
  };

  const handleItemReceived = (item) => {
    console.log(`Marking item as received: ${item.name}`);
  };

  const handleAddItemClick = () => {
    setAddNewItemFormOpen(true);
  };

  const handleCloseAddNewItemForm = () => {
    setAddNewItemFormOpen(false);
  };

  // handle search
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = items.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="rental-management-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <div>
          <h1>Item List (hardware side)</h1>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="button-container">
            <Link to="/lendedItems" style={{ marginLeft: "0", margin: "10px" }}>
              <Button variant="contained" color="primary">
                View Rented Items
              </Button>
            </Link>

            <Link style={{ marginLeft: "0", margin: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddItemClick}
              >
                Add New Item
              </Button>
            </Link>

            <Link
              style={{ marginLeft: "0", margin: "10px" }}
              to="/reserved-items"
            >
              <Button variant="contained" color="primary">
                View reserved
              </Button>
            </Link>

            <Link
              style={{ marginLeft: "0", margin: "10px" }}
              to="/rentalReport"
            >
              <Button variant="contained" color="primary">
                Invoice
              </Button>
            </Link>
          </div>

          <ProductList
            items={items}
            onLendClick={handleLendClick}
            onUpdateItemClick={onUpdateItemClick}
            searchTerm={searchTerm}
          />

          <Modal
            isOpen={isLendFormOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Lend Form Modal"
          >
            <LendForm
              isOpen={isLendFormOpen}
              onClose={handleCloseModal}
              onSave={handleSaveLendingData}
              selectedItemId={selectedItemId}
              selectedItemName={selectedItemName}
              selectedItemOneDay={selectedItemOneDay}
            />
          </Modal>
          <Modal
            isOpen={isAddNewItemFormOpen}
            onRequestClose={handleCloseAddNewItemForm}
            contentLabel="Add New Item Form Modal"
          >
            <AddNewItemForm onClose={handleCloseAddNewItemForm} />
          </Modal>
          <UpdateItemForm
            isOpen={isUpdateFormOpen}
            onClose={() => setUpdateFormOpen(false)}
            selectedItem={selectedItem}
          />
        </div>
      </div>
    </div>
  );
}

export default RentalManagement;
