import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/RecommendedProducts.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const RecommendedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/recommendedproducts"
        );
        setProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to load recommended products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return (
    <p style={{ textAlign: "center", color: "red" }}>{error}</p>
  );

  return (
    <section className="product-section">
      <h2>Recommended Products</h2>
      <div className="product-grid">
        {products.map((product) => {
          const fileName = product.image
            ? product.image.split("/").pop().split("\\").pop()
            : "";
          const imageUrl = `http://localhost:5000/uploads/recommended/${fileName}`;
          return (
            <div className="product" key={product._id}>
              <img
                src={imageUrl}
                alt={product.name}
                className="clickable"
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: {
                      _id: product._id,
                      title: product.name,
                      price: product.price,
                      description: product.description,
                      images: product.image ? [fileName] : [],
                      folder: "recommended",
                    },
                  })
                }
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <button
                className="add-btn"
                onClick={() =>
                  addToCart({
                    _id: product._id,
                    title: product.name,
                    price: product.price,
                    images: product.image ? [fileName] : [],
                    folder: "recommended",
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecommendedProducts;
