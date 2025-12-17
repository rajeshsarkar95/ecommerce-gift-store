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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/featuredproducts"
        );
        setProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to load featured products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return (
    <p style={{ textAlign: "center", color: "red" }}>{error}</p>
  );

  return (
    <section className="product-section">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product) => {
          // Extract filename safely
          const fileName = product.image
            ? product.image.split("/").pop().split("\\").pop()
            : "";

          const imageUrl = fileName
            ? `http://localhost:5000/uploads/featured/${fileName}`
            : "/placeholder.jpg";

          // Standardized product object for cart
          const cartProduct = {
            id: product._id,
            title: product.name || "No Name",
            price: product.price ?? 0,
            images: fileName ? [fileName] : [],
            folder: "featured",
          };

          return (
            <div className="product" key={product._id}>
              <img
                src={imageUrl}
                alt={cartProduct.title}
                className="clickable"
                loading="lazy"
                onClick={() =>
                  navigate(`/product/${product._id}`, { state: cartProduct })
                }
              />

              <h3>{cartProduct.title}</h3>

              <p>
                ₹{cartProduct.price}
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
                onClick={() => addToCart(cartProduct)}
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

export default FeaturedProducts;
