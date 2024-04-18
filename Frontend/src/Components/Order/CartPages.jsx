import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './order.css';

const CartPage = () => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changesMade, setChangesMade] = useState(false); // Track changes
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/cart')
            .then((response) => response.json())
            .then((data) => {
                
                setCarts(data.carts); 
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching cart details:", error);
                setLoading(false);
            });
    }, []);

    
    
    const handleQuantityChange = (index, itemIndex, newQuantity) => {
        const updatedCarts = [...carts];
        const item = updatedCarts[index].cartItems[itemIndex];
        if (newQuantity > 0 && newQuantity <= item.product.quantity) { 
            item.quantity = newQuantity;
            item.price = newQuantity * (item.product && item.product.price);
            setCarts(updatedCarts);
            setChangesMade(true); 
        }
    };

    const handleUpdateCart = () => {
        // Update cart in database
        fetch('http://localhost:8000/cart/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ carts }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Cart updated successfully:', data);
            setChangesMade(false); // Reset changes made to false
        })
        .catch((error) => {
            console.error("Error updating cart:", error);
            alert('Failed to update cart');
        });
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        carts.forEach((cart) => {
            cart.cartItems.forEach((item) => {
                totalPrice += item.price;
            });
        });
        return totalPrice;
    };

    
    
    const handleRemoveItem = (cartId,productId) => {
        // Remove entire cart from the database
        fetch(`http://localhost:8000/cart/${cartId}/remove/${productId}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Cart deleted successfully:', data);
            const updatedCarts = carts.map((cart) => {
                if (cart._id === cartId) {
                    cart.cartItems = cart.cartItems.filter((item) => item.product._id !== productId);
                }
                return cart;
            });
            setCarts(updatedCarts);
        })
        .catch((error) => {
            console.error("Error deleting cart:", error);
            alert('Failed to delete cart');
        });
    };


    const handleProceedToCheckout = () => {
        const totalPrice = calculateTotalPrice();
        
        
        fetch('http://localhost:8000/order/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carts,
                totalPrice
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Order created successfully:', data);
            navigate('/deliveryinfo',{ state: { totalPrice } });
        })
        .catch((error) => {
            console.error("Error creating order:", error);
            alert('Failed to create order');
        });
    };


 return (
    <div className="cartAll">
        <h2>Cart Details</h2>
        {loading ? (
            <p>Loading...</p>
        ) : carts.length === 0 ? (
            <p>No carts available</p>
        ) : (
            <div className="cart">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart, index) => (
                            <React.Fragment key={index}>
                                {cart.cartItems.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td><img src={`http://localhost:8000/images/${item.product.img_URL}`} alt={item.product.name} /></td>
                                        <td>{item.product ? item.product.name : 'Product Name Not Available'}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(index, itemIndex, parseInt(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            <Button 
                                                variant="contained"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleRemoveItem(cart._id, item.product._id)}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                {changesMade && (
            <button className="update-cart-btn" onClick={handleUpdateCart}>Update Cart</button>
        )}
            </div>
        )}
        
        
        <div className="checkout-section">
                <div>
                    <h3>Total Price </h3>
                    <h3><strong>{calculateTotalPrice()}</strong></h3>
                    <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
                </div>
        </div>
    </div>
  );
};




export default CartPage;
