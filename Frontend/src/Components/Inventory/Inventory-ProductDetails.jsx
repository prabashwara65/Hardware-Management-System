import { Link } from "react-router-dom";

const ProductDetails = ({Inventory}) => {
    return ( 
        <div className="productDetails">
            <Link to={ `http://localhost:5173/selectedItem/${Inventory._id}`}>
            <ul>
                <li className="productDetails-image"><img src={`http://localhost:8000/images/`+Inventory.img_URL} alt="Product" style={{ maxWidth: "30px" ,height:"30px"}}/></li>
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