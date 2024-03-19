import React, { useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";
import axios from "axios";

function ProductList({ onLendClick, onUpdateItemClick, searchTerm }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Fetch items from the server when the component mounts
    axios
      .get(`http://localhost:8000/items`)
      .then((response) => {
        setItems(response.data); // Update the component state with fetched items
        setFilteredItems(response.data); // Initialize filtered items with all items
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []); // The empty dependency array ensures the effect runs once on mount

  useEffect(() => {
    // Filter items based on search term
    if (searchTerm.trim() === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]); // Update filtered items when search term or items change

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {filteredItems.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onLendClick={onLendClick}
          onUpdateItemClick={onUpdateItemClick}
          style={{ margin: "10px" }}
        />
      ))}
    </div>
  );
}

export default ProductList;
