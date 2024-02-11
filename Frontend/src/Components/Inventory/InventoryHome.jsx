import { useEffect, useState } from 'react';

import './inventory.css'
import ProductDetails from './ProductDetails';
import Sidebar from '../Dashboard/Dashboard_Sidebar';

const  InventoryHome = () => {
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
    };
    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/inventory');
            const json = await response.json();

            if(response.ok){
              setProducts(json);
            } 
        };

        fetchProducts();
    }, [])

    return ( 
        
        <div className="home">
            
            
            <div className="searchbar">
                <h2>Products</h2>

                <div className="searchbox">
                    <select onChange={handleCategory} value={selectedCategory || ''} >
                        <option value=""> All </option>
                        <option value="Hand Tools"> Hand Tools </option>
                        <option value="Power Tools"> Power Tools </option>
                        <option value="Building Materials"> Building Materials </option>
                        <option value="Paint and Painting Supplies"> Paint and Painting Supplies </option>
                        <option value="Plumbing Supplies"> Plumbing Supplies </option>
                        <option value="Electrical Supplies"> Electrical Supplies </option>
                        <option value="Other"> Other </option>
                    </select>
                </div>

                <a href="/addnewItem" className="addButton">Add Item</a>

            </div>

            <div className="topicline">
                <ul>
                    <li><strong>Name</strong></li>
                    <li><strong>Category</strong></li>
                    <li><strong>Price (Rs)</strong></li>
                    <li><strong>Quantity</strong></li>
                </ul>
            </div>

            <hr/>

            <div className="products">
                {products && products.map((Inventory) => (
                    (!selectedCategory || Inventory.category === selectedCategory) && (
                    <ProductDetails key={Inventory._id} Inventory={Inventory}/>)
                ))}
            </div>

        </div>
     );
}
 
export default InventoryHome;
