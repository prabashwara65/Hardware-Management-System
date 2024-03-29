import { useState } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import './InventoryStyles.css';

const InventoryHome = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Hand Tools');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityLimit, setQuantityLimit] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const handleInventoryFrom = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('quantityLimit',quantityLimit);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:8000/inventory', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setName('');
            setCategory('Hand Tools');
            setPrice('');
            setQuantity('');
            setQuantityLimit('');
            setImage(null);
            setError(null);
            console.log('new product added', data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="newItem-form" onSubmit={handleInventoryFrom}>
            <h2>Add New Product</h2>
            <hr/>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Item Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Item Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        required
                    >
                        {['Hand Tools', 'Power Tools', 'Building Materials', 'Paint and Painting Supplies', 'Plumbing Supplies', 'Electrical Supplies', 'Other'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        label="Unit Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        label="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        label="Minimum Quantity"
                        value={quantityLimit}
                        onChange={(e) => setQuantityLimit(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </Grid>
            </Grid>

            <Button variant="contained" color="primary" type="submit">
                Add Item
            </Button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default InventoryHome;
