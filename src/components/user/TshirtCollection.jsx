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
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tshirt");
      const formatted = res.data.data.map((item) => ({
        id: item._id,
        title: item.title,
        price: item.price,
        img:
          item.image?.length > 0
            ? `http://localhost:5000/uploads/tshirt/${item.image[0]}`
            : Oversize1,
        alt: item.title,
      }));

      setProducts(formatted);
    } catch (error) {
      console.log("API Error:", error.message);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  return (
    <section className="tshirt-collection">
      <h2>T-Shirt And Hoodies Collection</h2>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
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
        ))}
      </div>
    </section>
  );
}
