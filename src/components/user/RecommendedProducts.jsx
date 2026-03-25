import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/RecommendedProducts.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ProductSkeleton from "./ProductSkeleton";


const RecommendedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(()=>{
    const fetchRecommended = async ()=>{
      try {
        const res = await axios.get(
          "https://onlinegiftbackend.onrender.com/api/recommendedproducts"
        );
        setProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to load recommended products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
  },[]);

  return (
    <section className="recommended-section">
      <h2 className="recommended-title">Recommended Products</h2>
      <div className="recommended-grid">
        {loading
          ? Array.from({length:6}).map((_,i)=>(
              <ProductSkeleton key={i}/>
            ))
          : error
          ? <p style={{ textAlign:"center",color:"red"}}>{error}</p>
          : products.length === 0
          ? <p style={{textAlign: "center"}}>No recommended products available.</p>
          : products.map((product)=>{
              const imageUrl = product.image?.url || "/placeholder.jpg";
              const cartProduct = {
                id: product._id,
                title: product.name || "No Name",
                price: product.price ?? 0,
                description: product.description || "",
                images: imageUrl ? [imageUrl] : [],
                folder: "recommended",
              };
              return (
                <div className="recommended-card" key={product._id}>
                  <img
                    src={imageUrl}
                    alt={cartProduct.title}
                    className="recommended-img clickable"
                    onClick={()=>
                      navigate(`/product/${product._id}`,{state:cartProduct})
                    }
                  />
                  <div className="recommended-product-conatainer">
                    <h3 className="recommended-product-title">{cartProduct.title}</h3>
                    <div className="recommended-product-price">
                      <small>₹{cartProduct.price}</small>
                      <button
                        className="recommended-add-btn"
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

      {!loading && products.length > 0 && (
        <div className="recommended-product-btn">
          <button
            onClick={() => navigate("/recommendedproducts")}
            className="recommeded-more-btn"
          >
            more
          </button>
        </div>
      )}
    </section>
  );
};

export default RecommendedProducts;
