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
        const res = await axios.get("http://localhost:5000/api/tshirt");
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
        {products.map((product) => (
          <div key={product._id} className="product">
            <img
              src={
                product.image?.length
                  ? `http://localhost:5000/uploads/tshirt/${product.image[0]}`
                  : Oversize1
              }
              alt={product.title}
              className="clickable"
              onClick={() =>
                navigate(`/product/${product._id}`, {
                  state: {
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    images: product.image || [],
                    folder: "tshirt",
                  },
                })
              }
            />


            <div className="product-info">
              <h4>{product.title}</h4>
              <p>₹{product.price}</p>

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
