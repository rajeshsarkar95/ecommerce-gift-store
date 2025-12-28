import React, { useEffect, useState } from "react";
import "../../styles/FeaturedProducts.css";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const FeaturedProductsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://onlinegiftbackend.onrender.com/api/featuredproducts");
        setProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to load featured products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <section className="featured-products-section">
      <h2 className="featured-products-title">Featured Products</h2>
      <div className="featured-products-grid">
        {products.map((product) => {
          const imageUrl = product.image || "/placeholder.jpg";

          const cartProduct = {
            id: product._id,
            title: product.title || product.name || "No Title",
            price: product.price ?? 0,
            images: product.image
              ? Array.isArray(product.image)
                ? product.image.map(img => (img.url ? img : { url: img }))
                : [{ url: product.image.url || product.image }]
              : [{ url: "/placeholder.jpg" }],
            folder: "featured",
          };
          return (
            <div className="featured-product-card" key={product._id}>
              <img
                src={imageUrl}
                alt={cartProduct.title}
                className="featured-product-img clickable"
                loading="lazy"
                onClick={() =>
                  navigate(`/product/${product._id}`, { state: cartProduct })
                }
              />
              <div className="featured-product-container">
                <h3 className="featured-product-title">{cartProduct.title}</h3>
                <div className="featured-product-price">
                  ₹{cartProduct.price}
                  {product.oldprice && (
                    <span className="featured-product-old-price"> ₹{product.oldprice}</span>
                  )}
                  <button
                    className="featured-product-add-btn"
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
};

export default FeaturedProductsPage;
