import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/RecommendedProducts.css";
import { useNavigate } from "react-router-dom";

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchRecommended = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recommendedproducts");
      setProducts(res.data.products); 
      setLoading(false);
    } catch (err) {
      setError("Failed to load recommended products",err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecommended();
  }, []);
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (loading) return <p>Loading recommended products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="product-section">
      <h2>Recommended Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <div
              className="product-card clickable"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() =>
                handleAddToCart({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: `http://localhost:5000/${product.image}`,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
