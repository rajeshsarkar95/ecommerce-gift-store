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
        const res = await axios.get("http://localhost:5000/api/mugs");
        setMugProducts(res.data.mugs || []);
      } catch (err) {
        setError("Failed to load mugs");
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
          const imageUrl = `http://localhost:5000/${product.image}`;

          return (
            <div className="product" key={product._id}>
              <img
                src={imageUrl}
                alt={product.name}
                className="clickable"
                loading="lazy"
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: {
                      _id: product._id,
                      title: product.name,
                      price: product.price,
                      images: product.image ? [product.image] : [],
                      folder: "mugs",
                    },
                  })
                }
              />

              <h3>{product.name}</h3>

              <p>
                {product.oldPrice && (
                  <span className="old-price">₹{product.oldPrice}</span>
                )}
                <span className="new-price"> ₹{product.price}</span>
              </p>

              <button
                className="add-btn"
                onClick={() =>
                  addToCart({
                    _id: product._id,
                    title: product.name,
                    price: product.price,
                    images: product.image ? [product.image] : [],
                    folder: "mugs",
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
}
