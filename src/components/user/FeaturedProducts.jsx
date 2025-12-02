import React from "react";
import "../../styles/FeaturedProducts.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const products = [
    {
      id: 501,
      img: "images/calendar1.jpg",
      alt: "Calendar",
      title: "Desktop Calendar",
      price: 300,
    },
    {
      id: 502,
      img: "images/calendar2.jpg",
      alt: "Calendar",
      title: "Calendar Cards",
      price: 200,
    },
    {
      id: 503,
      img: "images/lamp1.jpg",
      alt: "Lamp",
      title: "LED Photo Lamp",
      price: 1499,
    },
    {
      id: 504,
      img: "images/frame1.jpg",
      alt: "Frame",
      title: "Frame Calendars",
      price: 350,
    },
  ];

  return (
    <section className="product-section">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img
              src={product.img}
              alt={product.alt}
              className="clickable"
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <button
              className="add-btn"
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  image: product.img,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
