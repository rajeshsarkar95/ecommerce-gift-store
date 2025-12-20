import React, { useEffect, useState } from "react";
import "../../styles/FlashDeals.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function FlashDeals() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() =>{
    const fetchFlashDeals = async () => {
      try {
        const res = await fetch("https://onlinegiftbackend.onrender.com/api/flashdeals");
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
        {products.map((product) => {
          const cartProduct = { ...product, id: product._id, title: product.tittle };
          return (
            <div className="product-deals" key={product._id}>
              <img
                src={
                  product.images && product.images.length > 0
                    ? `https://onlinegiftbackend.onrender.com/uploads/flashdeals/${product.images[0]}`
                    : "/placeholder.jpg"
                }
                alt={cartProduct.title}
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: { ...cartProduct, folder: "flashdeals" },
                  })
                }
              />
              <div className="product-info">
                <h4>{cartProduct.title}</h4>
                <p>
                  ₹{product.price} <small>₹{product.oldPrice}</small>
                </p>
                <button className="add-btn" onClick={() => addToCart(cartProduct)}>
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

export default FlashDeals;
