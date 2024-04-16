// OrderPage.js
import React, { useEffect, useState } from 'react';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch('/order')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setOrders(data.orders);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching orders:", error);
    //             setLoading(false);
    //         });
    // }, []);
    useEffect(() => {
        fetch('http://localhost:8000/order')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.orders) {
                    setOrders(data.orders);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Order Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders available</p>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div key={index}>
                            <h3>Order {index + 1}</h3>
                            <p>Total Price: {order.totalPrice}</p>
                            <ul>
                                {order.carts.map((cart, cartIndex) => (
                                    <li key={cartIndex}>
                                        <h4>Cart {cartIndex + 1}</h4>
                                        <ul>
                                            {cart.cartItems.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <p>Product: {item.product ? item.product.name : 'Product Name Not Available'}</p>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <p>Price: {item.price}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
