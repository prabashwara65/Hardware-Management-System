import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../searchBar/searchBar";
import UserItemCard from "../UserItemCard/UserItemCard";

function UserItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // State for storing filtered items

  useEffect(() => {
    // Fetch items from the server when the component mounts
    axios
      .get(`http://localhost:8000/items`)
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data); // Initialize filtered items with all items
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  // Function to handle search
  const handleSearch = (searchTerm) => {
    // Filter items based on search term
    const filtered = items.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <>
      <h1>Item List (Customer side)</h1>
      <SearchBar onSearch={handleSearch} />{" "}
      {/* Integrate SearchBar component */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredItems.map((item) => (
          <UserItemCard key={item._id} item={item} style={{ margin: "10px" }} />
        ))}
      </div>
    </>
  );
}

export default UserItemList;
