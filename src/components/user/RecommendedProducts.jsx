import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/RecommendedProducts.css";

const RecommendedProducts = () => {
  const navigate = useNavigate();
  const products = [
    { id: 1, img: "images/clock1.jpg", alt: "Clock", title: "Star Personalized Clock", price: 390 },
    { id: 2, img: "images/wallet1.jpg", alt: "Wallet", title: "Stylish Photo Wallet", price: 800 },
    { id: 3, img: "images/penholder.jpg", alt: "Pen Holder", title: "Personalized Pen Holder", price: 504 },
    { id: 4, img: "images/ledname.jpg", alt: "LED Name", title: "Customized LED Name Sign", price: 1000 },
  ];
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };
  const openProductDetails = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <section className="product-section">
      <h2>Recommended Products</h2>
      <div className="product-grid">
        
        {products.map((product) => (
          <div className="product" key={product.id}>

            <div className="product-card" onClick={() => openProductDetails(product.id)}>
              <img src={product.img} alt={product.alt} />
              <h3>{product.title}</h3>
              <p>₹{product.price}.00</p>
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>
    </section>
  );
};

export default RecommendedProducts;
