import { Link } from "react-router-dom";

const Status = () => {
    return ( 
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Inventory</h1>
                    <hr/>
                    <div className="ststusBoxs">
                        <div className="box1">
                            <h3>Total Products</h3>
                        </div>
                        <div className="box2">
                            <h3>All Categories</h3>
                        </div>
                        <div className="box3">
                            <h3>Out of Stock</h3>
                        </div>
                        <div className="box4">
                            <h3>Total Value</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </header>
     );
}
 
export default Status;
