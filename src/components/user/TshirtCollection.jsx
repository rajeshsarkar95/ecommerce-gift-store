import React from "react";
import "../../styles/TshirtCollection.css";
import Oversize1 from "../../assets/Oversize1.png";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const defaultProducts = [
  {
    id: 201,
    title: "Oversize T-Shirt",
    price: 700,
    img: Oversize1,
    alt: "Oversize T-shirt",
  },
  {
    id: 202,
    title: "Pure Cotton Round Neck T-Shirt",
    price: 699,
    img: Oversize1,
    alt: "Round neck cotton t-shirt",
  },
  {
    id: 203,
    title: "Round Neck Custom Couple T-Shirt (Your Design)",
    price: 699,
    img: Oversize1,
    alt: "Custom couple t-shirt",
  },
  {
    id: 204,
    title: "Kalakaar Hindi Printed T-Shirt",
    price: 295,
    img: Oversize1,
    alt: "Hindi printed t-shirt",
  },
  {
    id: 205,
    title: "Custom T-Shirt (Double Side Printing)",
    price: 949,
    img: Oversize1,
    alt: "Custom double side print t-shirt",
  },
];

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="product">
      {/* 🔥 Click to open detail page */}
      <img
        src={product.img}
        alt={product.alt}
        loading="lazy"
        className="clickable"
        onClick={() => navigate(`/product/${product.id}`)}
      />

      <div className="product-info">
        <h4>{product.title}</h4>
        <p>₹{product.price}</p>

        {/* 🔥 Add to Cart button */}
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
    </div>
  );
}

export default function TshirtCollection({ products = defaultProducts }) {
  return (
    <section className="tshirt-collection">
      <h2>T-Shirt And Hoodies Collection</h2>

      <div className="product-list">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
