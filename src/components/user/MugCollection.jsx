import React from "react";
import "../../styles/MugCollection.css";
import whiteMug from "../../assets/whitemug.jpg";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const mugProducts = [
  {
    id: 401,
    img: whiteMug,
    alt: "White Mug",
    title: "Personalized White Photo Mug",
    price: 249,
  },
  {
    id: 402,
    img: whiteMug,
    alt: "Inner Color Mug",
    title: "Personalized Inner Color Mug",
    price: 320,
  },
  {
    id: 403,
    img: whiteMug,
    alt: "Photo Magic Mug",
    title: "Photo Magic Mug",
    price: 520,
  },
  {
    id: 404,
    img: whiteMug,
    alt: "Couple Mug",
    title: "Personalized Couple Mug",
    oldPrice: 550,
    price: 530,
  },
];

export default function MugCollection() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <section className="product-section">
      <h2>Mug Collection</h2>

      <div className="product-grid">
        {mugProducts.map((product) => (
          <div className="product" key={product.id}>
            <img
              src={product.img}
              alt={product.alt}
              className="clickable"
              onClick={() => navigate(`/product/${product.id}`)}
            />

            <h3>{product.title}</h3>

            <p>
              {product.oldPrice && (
                <span className="old-price">₹{product.oldPrice}</span>
              )}
              <span className="new-price"> ₹{product.price}</span>
            </p>

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
}
