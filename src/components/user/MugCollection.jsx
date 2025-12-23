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
        if (!res.data.success) throw new Error("Failed to fetch mugs");
        setMugProducts(res.data.mugs || []);
      } catch (err) {
        setError("Failed to load mugs: " + err.message);
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
    <section className="mug-collection-section">
      <h2 className="mug-collection-title">Mug Collection</h2>

      <div className="mug-collection-grid">
        {mugProducts.map((product) => {
          const imageUrl =
            product.image?.url ||
            (Array.isArray(product.image) && product.image.length > 0
              ? product.image[0].url
              : "/placeholder.jpg");

          const cartProduct = {
            id: product._id,
            title: product.name || "No Name",
            price: product.price ?? 0,
            images: product.image
              ? Array.isArray(product.image)
                ? product.image.map(img => (img.url ? img : { url: img }))
                : [{ url: product.image.url || product.image }]
              : [{ url: "/placeholder.jpg" }],
            folder: "mugs",
          };

          return (
            <div className="mug-card" key={product._id}>
              <img
                src={imageUrl}
                alt={cartProduct.title}
                className="mug-img clickable"
                loading="lazy"
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: cartProduct,
                  })
                }
              />

              <h3 className="mug-title">{cartProduct.title}</h3>

              <p className="mug-price">
                {product.oldPrice && (
                  <span className="mug-old-price">₹{product.oldPrice}</span>
                )}
                <span className="mug-new-price"> ₹{cartProduct.price}</span>
              </p>

              <button
                className="mug-add-btn"
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
