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
  const fetchMugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mugs");
      setMugProducts(res.data.mugs);
      setLoading(false);
    } catch (err) {
      setError("Failed to load mugs", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMugs();
  }, []);

  if (loading) return <p>Loading mugs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="product-section">
      <h2>Mug Collection</h2>

      <div className="product-grid">
        {mugProducts.map((product) => (
          <div className="product" key={product._id}>
            <img
              src={`http://localhost:5000/${product.image}`}
              alt={product.name}
              className="clickable"
              onClick={() => navigate(`/product/${product._id}`)}
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
}
