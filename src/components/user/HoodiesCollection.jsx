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
          const imageUrl = `http://localhost:5000/uploads/hoodies/${product.image}`;

          return (
            <div key={product._id} className="product">
              <img
                src={imageUrl}
                alt={product.title}
                className="clickable"
                loading="lazy"
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: {
                      _id: product._id,
                      title: product.title,
                      price: product.price,
                      description: product.description,
                      images: product.image ? [product.image] : [],  
                      folder: "hoodies", 
                    },
                  })
                }
              />

              <div className="product-info">
                <h4>{product.title}</h4>
                <p>₹{product.price}</p>

                <button
                  className="add-btn"
                  onClick={() =>
                    addToCart({
                      _id: product._id,
                      title: product.title,
                      price: product.price,
                      images: product.image ? [product.image] : [],
                      folder: "hoodies",
                    })
                  }
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
