import React from "react";
import "../../styles/HoodiesCollection.css";
import bosscopouple from "../../assets/Boss-Couple-2.jpg";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const hoodieProducts = [
  {
    id: 301,
    title: "Couple Personalized Hoodies",
    price: 700,
    img: bosscopouple,
    alt: "Couple Personalized Hoodie",
  },
  {
    id: 302,
    title: "Personalized Hoodies",
    price: 700,
    img: bosscopouple,
    alt: "Personalized Hoodie",
  },
  {
    id: 303,
    title: "Custom Printed Hoodies",
    price: 700,
    img: bosscopouple,
    alt: "Custom Hoodie",
  },
  {
    id: 304,
    title: "Demon Slayer Anime Hoodie",
    price: 700,
    img: bosscopouple,
    alt: "Anime Hoodie",
  },
];

function HoodieCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="product">
      <img
        src={product.img}
        alt={product.alt}
        className="clickable"
        loading="lazy"
        onClick={() => navigate(`/product/${product.id}`)}
      />

      <div className="product-info">
        <h4>{product.title}</h4>
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
    </div>
  );
}

export default function HoodiesCollection() {
  return (
    <section className="tshirt-collection">
      <h2>Hoodies Collection</h2>

      <div className="product-list">
        {hoodieProducts.map((item) => (
          <HoodieCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
