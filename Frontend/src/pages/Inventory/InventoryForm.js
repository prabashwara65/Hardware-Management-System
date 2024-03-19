import { useState } from "react";

const InventoryHome = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Hand Tools');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const handleInventoryFrom = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('image', image);

        try {
            const response = await fetch('/api/inventory', {
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
            setImage(null);
            setError(null);
            console.log('new product added', data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="newItem-form" onSubmit={handleInventoryFrom}>
            <h2>Add new product</h2>
            <hr/>

            <div className="row1">
                <label>Item Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}/> 
                <br/>

                <label>Item Category:</label>
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="Hand Tools"> Hand Tools </option>
                    <option value="Power Tools"> Power Tools </option>
                    <option value="Building Materials"> Building Materials </option>
                    <option value="Paint and Painting Supplies"> Paint and Painting Supplies </option>
                    <option value="Plumbing Supplies"> Plumbing Supplies </option>
                    <option value="Electrical Supplies"> Electrical Supplies </option>
                    <option value="Other"> Other </option>
                </select>
                <br/>
            </div>

            <div className="row2">
                <label>Unit Price:</label>
                <input type="number" onChange={(e) => setPrice(e.target.value)} value={price}/> 
                <br/>

                <label>Quantity:</label>
                <input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity}/> 
                <br/>

                <label>Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
            </div>

            <button>Add Item</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default InventoryHome;
