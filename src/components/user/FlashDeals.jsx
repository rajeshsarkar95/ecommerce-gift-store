import React,{ useEffect,useState} from "react";
import "../../styles/FlashDeals.css";
import { useCart } from "../../context/CartContext";
import ProductSkeleton from "./ProductSkeleton";
import { useNavigate } from "react-router-dom";

function FlashDeals(){
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    const fetchFlashDeals = async ()=>{
      try { 
        const res = await fetch("https://onlinegiftbackend.onrender.com/api/flashdeals");
        const data = await res.json();
        console.log("Fetched flash deals:",data);
        setProducts(data.data || []);
      } catch (error){
        console.error("Error fetching flash deals:",error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlashDeals();
  },[]);
  
  return (
    <section className="flash-deals-section">
      <h2 className="flash-deals-title">Flash Deals</h2>
      <div className="flash-deals-grid">
        {loading
          ? Array.from({ length:6}).map((_,index)=>(
            <ProductSkeleton key={index}/>
          ))
          : products.map((product)=>{
            const cartProduct = {...product,id:product._id,title:product.tittle};
            return (
              <div className="flash-deals-card" key={product._id}>
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0].url
                      : "/placeholder.jpg"
                  }
                  alt={cartProduct.title}
                  className="flash-deals-img"
                  onClick={() =>
                    navigate(`/product/${product._id}`,{
                      state: {...cartProduct,folder:"flashdeals"},
                    })
                  }
                />
                <div className="flash-deals-info">
                  <h4 className="flash-deals-product-title">{cartProduct.title}</h4>
                  <div className="flash-deals-price">
                    ₹{product.price}{""}
                    <small className="flash-deals-old-price">₹{product.oldPrice}</small>
                    <button
                      className="flash-deals-add-btn"
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
      {!loading && (
        <div className="flash-deals-bottom-buttons-more">
          <button
            className="flash-deals-add-btn-more-b"
            onClick={() => navigate("/flashdealspage")}
          >
            More
          </button>
        </div>
      )}
    </section>
  );
}
export default FlashDeals;
