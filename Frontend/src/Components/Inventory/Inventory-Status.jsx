import { Link } from "react-router-dom";

const Status = (props) => {
    const totalValue = props.totalvalue;
    const totalproducts = props.totalProducts;
    const totalOutOfproducts = props.outOfStock;

    return ( 
        <header>
            <div className="container">
                <Link to="#">
                    <h1>Inventory</h1>
                    <hr/>
                    <div className="statusBoxs">
                        <div className="box1">
                            <h3>Total Products:</h3>
                            <h3>{totalproducts}</h3>
                        </div>
                        <div className="box2">
                            <h3>All Categories:</h3>
                            <h3>7</h3>
                        </div>
                        <div className="box3">
                        <Link to='/supply-management/notifications'>
                            <h3>Out of Stock:</h3>
                            <h3>{totalOutOfproducts}</h3> 
                        </Link>                         
                        </div>
                        <div className="box4">
                            <h3>Total Value:</h3>
                            <h3>{totalValue}</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </header>
     );
}
 
export default Status;
