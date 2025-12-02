import React from "react";
import "../../styles/TopSellers.css";
import Flimg from "../../assets/Fl.jpg";
import cusionimg from "../../assets/cusion.jpg";
import ledimg from "../../assets/led.jpg";
import threeD from "../../assets/3dled.jpg";
import Woodframe from "../../assets/woodenframe.jpg";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function TopSellers() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const products = [
    {
      id: 101,
      name: "Frameless Photo Frame",
      price: 540,
      image: Flimg,
    },
    {
      id: 102,
      name: "Customized Printed Cushion",
      price: 150,
      image: cusionimg,
    },
    {
      id: 103,
      name: "LED Illusion Heart Lamp",
      price: 1499,
      image: ledimg,
    },
    {
      id: 104,
      name: "LED Photo Frame",
      price: 1500,
      image: threeD,
    },
    {
      id: 105,
      name: "Personalized Photo Frame",
      price: 350,
      image: Woodframe,
    },
  ];
  return (
    <section className="top-sellers">
      <h2>Top Sellers</h2>

      <div className="product-list">
        {products.map((p) => (
          <div className="product" key={p.id}>
            <img
              src={p.image}
              alt={p.name}
              className="clickable"
              onClick={() => navigate(`/product/${p.id}`, {state:p })}
            />
            <div className="product-info">
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <button
                className="add-btn"
                onClick={() => addToCart(p)}
              >
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
