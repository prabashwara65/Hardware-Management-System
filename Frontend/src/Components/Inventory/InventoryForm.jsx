import { useState } from "react";

const InventoryHome = () => {

    const[name, setName] = useState('');
    const[category, setCategory] = useState('Hand Tools');
    const[price, setPrice] = useState('');
    const[quantity, setQuantity] = useState('');
    const[error, setError] = useState(null);

    const handleInventoryFrom = async (e) => {
        e.preventDefault()

        const inventory = {name,category,price,quantity}
        
        const response = await fetch('/api/inventory',{
            method: 'POST',
            body: JSON.stringify(inventory),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setName('')
            setCategory('Hand Tools')
            setPrice('')
            setQuantity('')
            setError(null);
            console.log('new product added', json);
        }
    }

    return ( 
        <form className="newItem-form" onSubmit={handleInventoryFrom}>
            <h2>Add new product</h2>
            <hr/>

            <div className="row1">

            <label>Item Name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={ name }/> 
            <br></br>

            <label>Item Category:</label>
            <select onChange={(e) => setCategory(e.target.value)} value={ category }>
                <option value="Hand Tools"> Hand Tools </option>
                <option value="Power Tools"> Power Tools </option>
                <option value="Building Materials"> Building Materials </option>
                <option value="Paint and Painting Supplies"> Paint and Painting Supplies </option>
                <option value="Plumbing Supplies"> Plumbing Supplies </option>
                <option value="Electrical Supplies"> Electrical Supplies </option>
                <option value="Other"> Other </option>
            </select> 
            <br></br>

            </div>

            <br></br>

            <div className="row2">

            <label>Unit Price:</label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} value={ price }/> 
            <br></br>

            <label>Quantity:</label>
            <input type="number" onChange={(e) => setQuantity(e.target.value)} value={ quantity }/> 
            <br></br>

            </div>

            <br></br>

            <button>Add Item</button>

            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default InventoryHome;