import React, { useEffect, useState } from "react";
import "../../styles/TshirtCollection.css";
import Oversize1 from "../../assets/Oversize1.png";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";

export default function TshirtCollection(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProducts = async ()=>{
      try {
        const res = await axios.get(
          "https://onlinegiftbackend.onrender.com/api/tshirt"
        );
        setProducts(res.data.data || []);
      } catch (err){
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  },[]);

  return (
    <section className="tshirtSection">
      <h2 className="tshirtHeading">T-Shirt And Hoodies Collection</h2>
      <div className="tshirtGrid">
        {loading
          ? Array.from({ length: 6 }).map((_, i)=> <ProductSkeleton key={i}/>)
          : error
          ? <p>Error: {error}</p>
          : products.length === 0
          ? <p>No products available.</p>
          : products.map((product) => {
              const imageUrl =
                product.images?.[0]?.url || Oversize1;
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
                    
                    onClick={()=>
                      navigate(`/product/${product._id}`,{
                        state: {...cartProduct, folder:"tshirt"},
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

      {!loading && products.length > 0 && (
        <div className="Tshirt-bottom-buttons-more-con">
          <button
            onClick={() => navigate("/tshirtpage")}
            className="tshirt-more-btn"
          >
            More
          </button>
        </div>
      )}
    </section>
  );
}