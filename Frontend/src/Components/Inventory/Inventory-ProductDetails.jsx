import { Link } from "react-router-dom";

const ProductDetails = ({Inventory}) => {
    return ( 
        <div className="productDetails">
            <Link to={ `http://localhost:8000/selectedItem/${Inventory._id}`}>
            <ul>
                <li className="productDetails-name">{Inventory.name}</li>
                <li className="productDetails-category">{Inventory.category}</li>
                <li className="productDetails-price">{Inventory.price}</li>
                <li className="productDetails-quantity">{Inventory.quantity}</li>
            </ul>
            </Link>
        </div>
     );
}
 
export default ProductDetails;