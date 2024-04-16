import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
                
                setCarts(data.carts); // Assuming the response object has a property named carts
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
        if (newQuantity > 0 && newQuantity <= item.product.quantity) { // Ensure quantity is within bounds
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
            // Optionally, you can reset the carts state or redirect to another page
        })
        .catch((error) => {
            console.error("Error deleting cart:", error);
            alert('Failed to delete cart');
        });
    };

    // const handleProceedToCheckout = () => {
    //     navigate('/deliveryinfo', { calculateTotalPrice });
    // };
    // const handleProceedToCheckout = () => {
    //     const totalPrice = calculateTotalPrice();
    //     navigate('/deliveryinfo', { state: { totalPrice } });
    // };

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
    
    <div>
            <h2>Cart Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : carts.length === 0 ? (
                <p>No carts available</p>
            ) : (
                <div>
                    {carts.map((cart, index) => (
                        <div key={index}>
                            <h3>{index + 1}</h3>
                            <ul>
                                {cart.cartItems.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <p>Product:{item.product ? item.product.name : 'Product Name Not Available'}</p>
                                        <p>Price: {item.price}</p>
                                        <label htmlFor={`quantity_${index}_${itemIndex}`}>Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity_${index}_${itemIndex}`}
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, itemIndex, parseInt(e.target.value))}
                                        />
                                        <button onClick={() => handleRemoveItem(cart._id,item.product._id)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            {changesMade && (
                <button onClick={handleUpdateCart}>Update Cart</button>
            )}
            <div style={{ float: 'right', textAlign: 'right' }}>
                <h3>Total Price: {calculateTotalPrice()}</h3>
                
                <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            </div>
            <Link to="/">Back to Home</Link>
        </div>
  );
};


// const CartPage = ({ cart, deleteCartItem }) => {
//     const handleDelete = async (productId) => {
//         try {
//             await deleteCartItem(productId);
//         } catch (error) {
//             console.error('Error deleting item from cart:', error);
//             alert('Failed to delete item from cart');
//         }
//     };

//     return (
//         <div className="cartPage">
//             <h2>Cart Items</h2>
//             <ul>
//                 {cart.map((item, index) => (
//                     <li key={index}>
//                         {item.name} - {item.price}
//                         <button onClick={() => handleDelete(item._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };



export default CartPage;
