import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/MugCollection.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function MugCollection() {
  const [mugProducts, setMugProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMugs = async () => {
      try {
        const res = await axios.get("https://onlinegiftbackend.onrender.com/api/mugs");
        setMugProducts(res.data.mugs || []);
      } catch (err) {
        setError("Failed to load mugs",err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMugs();
  }, []);

  if (loading) return <p>Loading mugs...</p>;
  if (error) return <p>{error}</p>;
  if (!mugProducts.length) return <p>No mugs available.</p>;

  return (
    <section className="product-section">
      <h2>Mug Collection</h2>

      <div className="product-grid">
        {mugProducts.map((product) => {
          // Ensure proper image URL
          const imageUrl = product.image
            ? `https://onlinegiftbackend.onrender.com/${product.image}`
            : "/placeholder.jpg";

          // Map product for CartContext
          const cartProduct = {
            id: product._id,
            title: product.name || "No Name",
            price: product.price ?? 0,
            images: product.image ? [product.image] : [],
            folder: "mugs",
          };

          return (
            <div className="product" key={product._id}>
              <img
                src={imageUrl}
                alt={cartProduct.title}
                className="clickable"
                loading="lazy"
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: cartProduct,
                  })
                }
              />

              <h3>{cartProduct.title}</h3>

              <p>
                {product.oldPrice && (
                  <span className="old-price">₹{product.oldPrice}</span>
                )}
                <span className="new-price"> ₹{cartProduct.price}</span>
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
}
