import { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";

const HomeSelectedItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const Url = `http://localhost:8000/inventory/${id}`;
  
    setLoading(true);

    // Fetch inventory details
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);



  return (
    <div className="selectedProduct">
      {loading && <p>Loading...</p>}
      {!loading && !product && <p>No product found</p>}
      {!loading && product && (

        <div className="detailsBox">
          <p>Product Name : {product.name}</p>
          <p>Unit Price : {product.price}</p>
          <p>Available Amount : {product.quantity}</p>
        </div>

      )}
        

    </div>
  );
};

export default HomeSelectedItem;
