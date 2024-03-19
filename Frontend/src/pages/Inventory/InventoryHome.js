import { useEffect, useState } from 'react';
import ProductDetails from '../components/Inventory-ProductDetails';
import Status from '../components/Inventory-Status';

const InventoryHome = () => {
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [curPage, setCurPage] = useState(1);
    const recordsPerPage = 6;

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
        setCurPage(1); // Reset page number when category change
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/inventory');
            const json = await response.json();

            if(response.ok){
              setProducts(json);
            } 
        };

        fetchProducts();
    }, []);

    //function to cal total value
    const calculateTotalValue = () => {
        if (!products) {
            return 0;
        }
        let totalValue = 0;
        products.forEach(product => {
            if (!selectedCategory || product.category === selectedCategory) {
                totalValue += product.price * product.quantity;
            }
        });
        return totalValue;
    };

    //function to cal total products
    const calculateTotalProducts = () => {
        if (!products) {
            return 0;
        }
        let totalProducts = 0;
        products.forEach(product => {
            if (!selectedCategory || product.category === selectedCategory) {
                totalProducts += 1;
            }
        });
        return totalProducts;
    };

    //function to check and find out of stock
    const calculateOutOfStock = () => {
        if (!products) {
            return 0;
        }
        let outOfStock = 0;
        let lowStockProducts = []; // Array to store low stock product data

        products.forEach(product => {
            if (!selectedCategory || product.category === selectedCategory) {
                if(product.quantity === 0){
                    outOfStock += 1;
                } else if(product.quantity <= 5){
                    lowStockProducts.push({ name: product.name, category: product.category });
                }
            }
        });

        if (lowStockProducts.length > 0) {
            sendLowStocktoBackend(lowStockProducts); // Send low stock data to backend
        }
        
        return outOfStock;
    };

    //sendLowStocktoBackend function to accept low stock product data
    const sendLowStocktoBackend = async (lowStockProducts) => {
        try {
            const response = await fetch('/api/lowStock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lowStockProducts }), // Pass low stock product data to backend
            });
            if (!response.ok) {
                if(response.status === 200){
                    console.log('data already exist');
                } else {
                    throw new Error('failed to send data');
                }
            } else {
                console.log('data send successfully');
            }
        } catch (error) {
            console.error('error sending data', error);
        }
    };

    //pagination variables
    const lastIndex = curPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const filteredProducts = products ? products.filter(product => !selectedCategory || product.category === selectedCategory) : [];
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const noOfPage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = [...Array(noOfPage + 1).keys()].slice(1);

    //pagination function
    function previousPage(){
        if(curPage !== 1) {
            setCurPage(curPage - 1)
        }
     }

     function changeCurPage(id){
        setCurPage(id)
     }

     function nextPage(){
        if(curPage !== noOfPage) {
            setCurPage(curPage + 1)
        }
     }

    return ( 
        
        <div className="home">
            <Status totalvalue={calculateTotalValue()} totalProducts={calculateTotalProducts()} outOfStock={calculateOutOfStock()}/>
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
                <div className="searchbar"><input type="text"/></div>
                <a href="/addnewItem" className="addButton">Add Item</a>
            </div>
            <div className="topicline">
                <ul>
                    <li className='topic-name'><strong>Name</strong></li>
                    <li><strong className='topic-category'>Category</strong></li>
                    <li><strong className='topic-price'>Price (Rs)</strong></li>
                    <li><strong className='tpoic-quantity'>Quantity</strong></li>
                </ul>
            </div>
            <hr/>
            {records.map((Inventory) => (
                <ProductDetails key={Inventory._id} Inventory={Inventory}/>
            ))}
            <div>
                <a href="/report1" className="genReport">Gen report1</a>
            </div>

            <br></br>
            <div className='pagination'>
                <li className='page-item'>
                    <button className='page-link' onClick={previousPage}> Prev </button>
                </li>
                {
                    numbers.map((n, i) => (
                        <li className={`page-item ${curPage === n ? 'active': ''}`} key={i}>
                            <button className='page-link' onClick={() => changeCurPage(n)}> {n} </button>
                        </li>
                    ))
                }
                <li className='page-item'>
                    <button className='page-link'onClick={nextPage}> Next </button>
                </li>
            </div>
        </div>
     );

}

export default InventoryHome;
