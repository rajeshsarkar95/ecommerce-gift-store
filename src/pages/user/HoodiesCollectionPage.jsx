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
        const { data } = await axios.get(
          "https://onlinegiftbackend.onrender.com/api/hoodies"
        );
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
  
  const sectionStyle = {
    width: "100%",
    margin: "auto",
    padding: "121px 0",
  };
  return (
    <section style={sectionStyle} className="hoodieSection">
      <h2 className="hoodieHeading">Hoodies Collection</h2>
      <div className="hoodieGrid">
        {hoodies.map((product) => {
          const imageUrl =
            product.image?.url ||
            (product.images && product.images.length > 0
              ? product.images[0].url
              : "/placeholder.jpg");
          const cartProduct = {
            id: product._id,
            title: product.title || "No Title",
            price: product.price ?? 0,
            images: product.image
              ? Array.isArray(product.image)
                ? product.image.map((img) =>
                  img.url ? img : { url: img }
                )
                : [{ url: product.image.url || product.image }]
              : [],
            folder: "hoodies",
            description: product.description || "",
          };

          return (
            <div key={product._id} className="hoodieCard">
              <img
                src={imageUrl}
                alt={cartProduct.title}
                className="hoodieImage"
                loading="lazy"
                onClick={() =>
                  navigate(`/product/${product._id}`,{
                    state: cartProduct,
                  })
                }
              />
              <div className="hoodieDetails">
                <h4 className="hoodieTitle">{cartProduct.title}</h4>
                <div className="hoodiePrice">
                  <small>
                    ₹{cartProduct.price}
                  </small>
                  <button
                    className="hoodieAddBtn"
                    onClick={() => addToCart(cartProduct)}
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
