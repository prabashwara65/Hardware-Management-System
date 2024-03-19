import React, { useState } from "react";
import "./searchBar.css";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // or SearchOutlined
// Import other necessary components and libraries

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      handleSearch();
    }
  };

  return (
    <>
      <div className="searchBar">
        <div className="search-container">
          <Paper
            component="form"
            sx={{
              p: "2px 40px",
              display: "flex",
              alignItems: "center",
              // width: 400,
            }}
          >
            <span>
              <InputBase
                placeholder="Search items..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                sx={{ ml: 1, flex: 1 }}
              />
            </span>
            <span>
              <IconButton type="button" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </span>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default SearchBar;