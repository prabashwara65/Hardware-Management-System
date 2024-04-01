import { Link } from "react-router-dom";

const HomeProductDetails = ({Inventory}) => {
    return ( 
        <div style={{ alignItems: "center", textAlign: "center", margin:"auto" }}>
            <Link to={ `http://localhost:5173/cusSelectedItem/${Inventory._id}`}>
            <div className="homeProductDetails" >
                <div className="product-picture"><img src={`http://localhost:8000/images/`+Inventory.img_URL} alt="Product" style={{ maxWidth: "170px" ,height:"280px"}}/></div>
                <div><strong>{Inventory.name}</strong></div>
                <div>Rs :{Inventory.price}</div>
            </div>
            </Link>
        </div>
     );
}
 
export default HomeProductDetails;