import React, { useEffect, useState } from "react";
import "../../styles/FeaturedProducts.css";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/featuredproducts"
        );
        setProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to load featured products",err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <section className="product-section">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product) => {
          const fileName = product.image
            ? product.image.split("/").pop().split("\\").pop()
            : "";

          const imageUrl = `http://localhost:5000/uploads/featured/${fileName}`;

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
                      images: fileName ? [fileName] : [],
                      folder: "featured", 
                    },
                  })
                }
              />

              <h3>{product.name}</h3>

              <p>
                ₹{product.price}
                {product.oldprice && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: 10,
                      color: "grey",
                    }}
                  >
                    ₹{product.oldprice}
                  </span>
                )}
              </p>

              <button
                className="add-btn"
                onClick={() =>
                  addToCart({
                    _id: product._id,
                    title: product.name,
                    price: product.price,
                    images: fileName ? [fileName] : [],
                    folder: "featured",
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
};

export default FeaturedProducts;
