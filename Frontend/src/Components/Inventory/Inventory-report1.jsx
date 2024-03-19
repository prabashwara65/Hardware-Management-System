import React, { useState, useEffect, useRef } from 'react';
import{useReactToPrint} from 'react-to-print';

const Report1 = () => {
    const componentPDF = useRef();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/inventory');
                const data = await response.json();
                if (response.ok) {
                    setProducts(data);
                } else {
                    throw new Error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Function to group products by category and calculate product count and total value
    const groupProductsByCategory = () => {
        const groupedProducts = {};
        products.forEach((product) => {
            if (!groupedProducts[product.category]) {
                groupedProducts[product.category] = {
                    products: [],
                    itemCount: 0,
                    totalValue: 0,
                };
            }
            groupedProducts[product.category].products.push(product);
            groupedProducts[product.category].itemCount += product.quantity;
            groupedProducts[product.category].totalValue += product.price * product.quantity;
        });
        return groupedProducts;
    };

    const groupedProducts = groupProductsByCategory();

    const generateReport = useReactToPrint({
        content: ()=> componentPDF.current,
        documentTitle:"Inventory data list",
        onAfterPrint:()=>alert("Inventory list downloaded")
    })

    return (
        <div className='printableArea'>
            <div ref={componentPDF} style={{width:'100%'}}>
                <h2>Inventory Report</h2>
                {Object.keys(groupedProducts).map((category) => (
                    <div key={category}>
                        <h3>{category}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price (Rs)</th>
                                    <th>Quantity</th>
                                    <th>Total value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedProducts[category].products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.price * product.quantity}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="2"></td>
                                    <td>{groupedProducts[category].itemCount}</td>
                                    <td>{groupedProducts[category].totalValue}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
                </div>
            <div>
                <button onClick={ generateReport }>Print</button>
            </div>
        </div>
    );
};

export default Report1;
