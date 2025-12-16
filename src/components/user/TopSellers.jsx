import React, { useEffect, useState } from "react";
import "../../styles/TopSellers.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TopSellers() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/topseller");
        const data = res.data.data || res.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  if (loading) return <p>Loading top sellers...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No top sellers available.</p>;
  return (
    <section className="top-sellers">
      <h2>Top Sellers</h2>
      <div className="product-list">
        {products.map((p) => (
          <div className="top-seller-product" key={p._id}>
            <img
              src={`http://localhost:5000/uploads/topSellar/${p.images?.[0] || "placeholder.jpg"}`}
              alt={p.title || "Product Image"}
              className="clickable"
              onClick={() =>
                navigate(`/product/${p._id}`, {
                  state: {
                    ...p,
                    folder: "topSellar",
                    title: p.title || p.tittle || "No Title" 
                  }
                })
              }

            />
            <div className="product-info">
              <h4>{p.title || "No Title"}</h4>
              <p>₹{p.price ?? "N/A"}</p>
              <button className="add-btn" onClick={() =>addToCart(p)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="back-top">
        <a href="#top">↑ Back to top</a>
      </div>
    </section>
  );
}

export default TopSellers;
