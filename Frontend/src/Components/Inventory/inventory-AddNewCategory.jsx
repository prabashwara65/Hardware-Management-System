import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = async () => {
    try {
      const response = await fetch('http://localhost:8000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      setCategoryName('');
      setError('');
      alert('Category added successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='newCategory-form'>
      <h2>Add New Category</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <br></br>
        <Button variant="contained" color="primary" type="submit">
          Add Category
        </Button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddCategoryForm;
