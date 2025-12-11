import React, { useEffect, useState } from "react";
import "../../styles/FeaturedProducts.css";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch API using axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/featuredproducts");

        console.log("API Response:", res.data);

        setProducts(res.data.products);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setError("Failed to load featured products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  return (
    <section className="product-section">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <img
              src={`http://localhost:5000/uploads/featured/${product.image}`}
              alt={product.name}
              className="clickable"
              onClick={() => navigate(`/product/${product._id}`)}
            />
            <h3>{product.name}</h3>

            <p>
              ₹{product.price}
              {product.oldprice && (
                <span
                  style={{
                    textDecoration: "line-through",
                    marginLeft: 10,
                    color: "grey",
                  }}
                >
                  ₹{product.oldprice}
                </span>
              )}
            </p>

            <button
              className="add-btn"
              onClick={() =>
                addToCart({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
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

export default FeaturedProducts;
