import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BarCode from './Inventory-Barcode';
import './InventoryStyles.css'

const SelectedItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //handleDelete function
  const handleDelete = async () => {
    // Confirm message
    const userConfirmedDelete = window.confirm("Are you sure to delete this item?");

    if (userConfirmedDelete) {
      const response = await fetch(`http://localhost:8000/inventory/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        navigate('/inventory');
      } else {
        const json = await response.json();
        console.error("Error deleting product:", json.error);
      }
    }
  }

  //handleEdit function
  const handleEdit = () => {
    navigate(`/editItem/${id}`);
  }

  useEffect(() => {
    const Url = `http://localhost:8000/inventory/${id}`;

    setLoading(true);

    // Fetch inventory details
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="selectedProduct">
      <div>
     
        {loading && <p>Loading...</p>}
        {!loading && !product && <p>No product found</p>}
        {!loading && product && (

          <div className="detailsBox">
            <p>Product Id : {id}</p>
            <p>Product Name : {product.name}</p>
            <p>Product Category : {product.category}</p>
            <p>Unit Price : {product.price}</p>
            <p>Available Amount : {product.quantity}</p>
            <p>Quantity Limit : {product.quantityLimit}</p>
            <p>Total Value of product : {product.price * product.quantity} </p>
            <p>Photo:</p>
            <img src={product.img_URL} alt="Product" style={{ maxWidth: "300px" }} />
          </div>
        )}
        <BarCode id={id} />
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
    
  );
};

export default SelectedItem;
