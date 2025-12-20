import React, { useEffect, useState } from "react";
import "../../styles/TshirtCollection.css";
import Oversize1 from "../../assets/Oversize1.png";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TshirtCollection() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://onlinegiftbackend.onrender.com/api/tshirt");
        setProducts(res.data.data || []);
      } catch (error) {
        console.log("API Error:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="tshirt-collection">
      <h2>T-Shirt And Hoodies Collection</h2>

      <div className="product-list">
        {products.map((product) => {
          // Map _id → id for CartContext
          const cartProduct = {
            ...product,
            id: product._id,
            title: product.title || "No Title",
            images: product.image || [],
          };

          return (
            <div key={product._id} className="product">
              <img
                src={
                  cartProduct.images.length
                    ? `https://onlinegiftbackend.onrender.com/uploads/tshirt/${cartProduct.images[0]}`
                    : Oversize1
                }
                alt={cartProduct.title}
                className="clickable"
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: { ...cartProduct, folder: "tshirt" },
                  })
                }
              />

              <div className="product-info">
                <h4>{cartProduct.title}</h4>
                <p>₹{product.price ?? "N/A"}</p>

                <button
                  className="add-btn"
                  onClick={() => addToCart(cartProduct)}
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
