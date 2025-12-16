import React, { useEffect, useState } from "react";
import "../../styles/FlashDeals.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function FlashDeals() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchFlashDeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/flashdeals");
        const data = await res.json();
        console.log("Fetched flash deals:", data);
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching flash deals:", error);
      }
    };
    fetchFlashDeals();
  }, []);
  return (
    <section className="flash-deals">
      <h2>Flash Deals</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-deals" key={product._id}>
            <img
              src={`http://localhost:5000/uploads/flashdeals/${product.images[0]}`}
              alt={product.title || product.tittle}
              onClick={() =>
                navigate(`/product/${product._id}`, {
                  state: { ...product, folder: "flashdeals" }
                })
              }
            />
            <div className="product-info">
              <h4>{product.tittle}</h4>
              <p>
                ₹{product.price} <small>₹{product.oldPrice}</small>
              </p>
              <button className="add-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FlashDeals;
