import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../../styles/HoodiesCollection.css";

export default function HoodiesCollection() {
  const [hoodies, setHoodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoodies = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/hoodies");
        if (!data.success) throw new Error(data.message);
        setHoodies(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHoodies();
  }, []);

  if (loading) return <p>Loading Hoodies...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!hoodies.length) return <p>No hoodies available.</p>;

  return (
    <section className="tshirt-collection">
      <h2>Hoodies Collection</h2>

      <div className="product-list">
        {hoodies.map((product) => {
          // Ensure image URL
          const imageUrl = product.image
            ? `http://localhost:5000/uploads/hoodies/${product.image}`
            : "/placeholder.jpg";

          // Standardize product object for cart
          const cartProduct = {
            id: product._id,
            title: product.title || "No Title",
            price: product.price ?? 0,
            images: product.image ? [product.image] : [],
            folder: "hoodies",
            description: product.description || "",
          };

          return (
            <div key={product._id} className="product">
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

              <div className="product-info">
                <h4>{cartProduct.title}</h4>
                <p>₹{cartProduct.price}</p>

                <button
                  className="add-btn"
                  onClick={() => addToCart(cartProduct)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
