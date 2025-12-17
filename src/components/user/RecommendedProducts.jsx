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
        setError("Failed to load recommended products");
        console.error(err);
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
          // Extract filename from path
          const fileName = product.image
            ? product.image.split("/").pop().split("\\").pop()
            : "";
          
          // Construct image URL
          const imageUrl = fileName
            ? `http://localhost:5000/uploads/recommended/${fileName}`
            : "/placeholder.jpg";

          // Map product for CartContext
          const cartProduct = {
            id: product._id,
            title: product.name || "No Name",
            price: product.price ?? 0,
            description: product.description || "",
            images: fileName ? [fileName] : [],
            folder: "recommended",
          };

          return (
            <div className="product" key={product._id}>
              <img
                src={imageUrl}
                alt={cartProduct.title}
                className="clickable"
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: cartProduct,
                  })
                }
              />
              <h3>{cartProduct.title}</h3>
              <p>₹{cartProduct.price}</p>
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

export default RecommendedProducts;
