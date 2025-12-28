import React, { useEffect, useState } from "react";
import "../../styles/TshirtCollection.css";
import Oversize1 from "../../assets/Oversize1.png";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TShirtCollectionPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://onlinegiftbackend.onrender.com/api/tshirt"
        );
        setProducts(res.data.data || []);
      } catch (error) {
        console.log("API Error:", error.message);
      }
    };
    fetchProducts();
  }, []);
  const sectionStyle = {
    width: "100%",
    margin: "auto",
    padding: "121px 0",
    backgroundColor: "#f9f9f9",
  };
  return (
    <section  style={sectionStyle} className="tshirtSection">
      <h2 className="tshirtHeading">T-Shirt And Hoodies Collection</h2>

      <div className="tshirtGrid">
        {products.map((product) => {
          const imageUrl =
            product.image?.url ||
            (Array.isArray(product.image) && product.image.length > 0
              ? product.image[0].url
              : Oversize1);

          const cartProduct = {
            ...product,
            id: product._id,
            title: product.title || "No Title",
            imageUrl,
          };

          return (
            <div key={product._id} className="tshirtCard">
              <img
                src={cartProduct.imageUrl}
                alt={cartProduct.title}
                className="tshirtImage"
                onClick={() =>
                  navigate(`/product/${product._id}`, {
                    state: { ...cartProduct, folder: "tshirt" },
                  })
                }
              />
              <div className="tshirtDetails">
                <h3 className="tshirtTitle">{cartProduct.title}</h3>
                <div className="tshirtPriceRow">
                  <span className="tshirtPrice">
                    ₹{product.price ?? "N/A"}
                  </span>
                  <button
                    className="tshirtAddBtn"
                    onClick={() => addToCart(cartProduct)}
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
