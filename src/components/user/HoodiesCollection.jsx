import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";
import "../../styles/HoodiesCollection.css";

export default function HoodiesCollection() {
  const [hoodies, setHoodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHoodies = async () => {
      try {
        const { data } = await axios.get(
          "https://onlinegiftbackend.onrender.com/api/hoodies"
        );
        if (!data.success) throw new Error(data.message);
        setHoodies(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHoodies();
  }, []);
  return (
    <section className="hoodieSection">
      <h2 className="hoodieHeading">Hoodies Collection</h2>
      <div className="hoodieGrid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : error
            ? <p>Error: {error}</p>
            : hoodies.length === 0
              ? <p>No hoodies available.</p>
              : hoodies.map((product) => {
                const imageUrl =
                  product.image?.url ||
                  (product.images && product.images.length > 0
                    ? product.images[0].url
                    : "/placeholder.jpg");
                const cartProduct = {
                  id: product._id,
                  title: product.title || "No Title",
                  price: product.price ?? 0,
                  images: product.image
                    ? Array.isArray(product.image)
                      ? product.image.map((img) =>
                        img.url ? img : { url: img }
                      )
                      : [{ url: product.image.url || product.image }]
                    : [],
                  folder: "hoodies",
                  description: product.description || "",
                };

                return (
                  <div key={product._id} className="hoodieCard">
                    <img
                      src={imageUrl}
                      alt={cartProduct.title}
                      className="hoodieImage"
                      loading="lazy"
                      onClick={() =>
                        navigate(`/product/${product._id}`, {
                          state: {
                            ...cartProduct,
                            category: product.category,
                          },
                        })
                      }
                    />
                    <div className="hoodieDetails">
                      <h4 className="hoodieTitle">{cartProduct.title}</h4>
                      <div className="hoodiePrice">
                        <small>₹{cartProduct.price}</small>
                        <button
                          className="hoodieAddBtn"
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

      {!loading && hoodies.length > 0 && (
        <div className="hoodies-more-buttons-con">
          <button
            onClick={() => navigate("/hoodiesPage")}
            className="hoodies-more-btn"
          >
            More
          </button>
        </div>
      )}

    </section>
  );
}
