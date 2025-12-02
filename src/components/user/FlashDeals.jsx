import React from "react";
import "../../styles/FlashDeals.css";
import photoframe1 from "../../assets/Photoframe1.png";
import cusion from "../../assets/cusion.jpg";
import Clock from "../../assets/Clock.png";
import Moonlamp from "../../assets/Moonlamp.jpg";
import shiper from "../../assets/shiper.png";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function FlashDeals() {
  const { addToCart } = useCart();
  const navigate = useNavigate()

  const products = [
    {
      id: 1,
      name: "Personalized Photo Frame",
      price: 350,
      oldPrice: 500,
      image: photoframe1,
    },
    {
      id: 2,
      name: "Personalized Photo Cushion",
      price: 270,
      oldPrice: 350,
      image: cusion,
    },
    {
      id: 3,
      name: "Star Personalized Wall Clock",
      price: 390,
      oldPrice: 500,
      image: Clock,
    },
    {
      id: 4,
      name: "Customized Moon Tree Lamp",
      price: 1499,
      oldPrice: 2000,
      image: Moonlamp,
    },
    {
      id: 5,
      name: "Customized Ship Model",
      price: 1499,
      oldPrice: 2000,
      image: shiper,
    },
  ];
  return (
    <section className="flash-deals">
      <h2>Flash Deals</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img
             src={product.image}
             alt={product.name}
             onClick={() => navigate(`/product/${product.id}`, {state:product })}
              />

            <div className="product-info">
              <h4>{product.name}</h4>
              <p>
                ₹{product.price} <small>₹{product.oldPrice}</small>
              </p>
              <button
                className="add-btn"
                onClick={() => addToCart(product)}
              >
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
