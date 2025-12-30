import React, { useEffect, useState } from "react";
import "../../styles/TopSellers.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";

function TopSellers() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const res = await axios.get("https://onlinegiftbackend.onrender.com/api/topseller");
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

  return (
    <section className="top-sellers-section">
      <h2 className="top-sellers-title">Top Sellers</h2>
      <div className="top-sellers-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : error
          ? <p>{error}</p>
          : products.length === 0
          ? <p>No top sellers available.</p>
          : products.map((p) => {
              const product = {
                ...p,
                id: p._id,
                title: p.title || p.tittle || "No Title",
              };
              return (
                <div className="top-sellers-card" key={p._id}>
                  <img
                    src={product.images?.[0]?.url || "/placeholder.jpg"}
                    alt={product.title}
                    className="top-sellers-img clickable"
                    onClick={() =>
                      navigate(`/product/${p._id}`, {
                        state: { ...product, folder: "topSeller" },
                      })
                    }
                  />
                  <div className="top-sellers-info">
                    <h4 className="top-sellers-product-title">{product.title}</h4>
                    <div className="top-sellers-price">
                      <small>₹{product.price ?? "N/A"}</small>
                      <button
                        className="top-sellers-add-btn"
                        onClick={() => addToCart(product)}
                      >
                        Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {!loading && products.length > 0 && (
        <div className="topSeller-bottom-buttons-more">
          <button
            onClick={() => navigate("/topsellerpage")}
            className="top-sellers-add-btn-t"
          >
            More
          </button>
        </div>
      )}

      {!loading && (
        <div className="top-sellers-back-top">
          <a href="#top">↑ Back to top</a>
        </div>
      )}
    </section>
  );
}

export default TopSellers;
