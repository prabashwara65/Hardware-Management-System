import { Link } from "react-router-dom";
import formatNumber from 'format-number';

const ProductDetails = ({ Inventory }) => {
    // Define options for formatting
    const options = { round: 2 };

    // Format price with three digit comma
    const formattedPrice = formatNumber(options)(Inventory.price);

    // Calculate discounted price
    const discountedPrice = Inventory.price - (Inventory.price * (Inventory.discount / 100));
    const formattedDiscountedPrice = formatNumber(options)(discountedPrice);

    return ( 
        <div className="productDetails">
            <Link to={`http://localhost:5173/selectedItem/${Inventory._id}`}>
                <table>  
                    <tr>
                        <td className="productDetails-image">
                            <img src={`http://localhost:8000/images/${Inventory.img_URL}`} alt="Product"/>
                        </td>
                        <td className="productDetails-name">{Inventory.name}</td>
                        <td className="productDetails-price">{formattedPrice}</td>
                        <td className="productDetails-disPrice">{formattedDiscountedPrice}</td>
                        <td className="productDetails-quantity">{Inventory.quantity}</td>
                    </tr>
                </table>
            </Link>
        </div>
     );
}
 
export default ProductDetails;
