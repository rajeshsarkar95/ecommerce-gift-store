import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/ProductDetails.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
export default function ProductDetails() {
  const { id } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate();
  const { addToCart } = useCart(); 
  const [product, setProduct] = useState(null); 
  const [relatedProducts, setRelatedProducts] = useState([]); 

  useEffect(() => {
    if (location.state) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(location.state);
      localStorage.setItem("product_" + id, JSON.stringify(location.state));
    } else {
      const stored = localStorage.getItem("product_" + id);
      if (stored) setProduct(JSON.parse(stored));
    }
  }, [id, location.state]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      try {
        const res = await fetch(
          `https://onlinegiftbackend.onrender.com/api/relatedproducts?category=${product.category}`
        );
        const data = await res.json();
        const filtered = (data.data || []).filter((p) => p._id !== product._id);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchRelatedProducts();
  }, [product]);

  if (!product) return <h2>Product not found</h2>;

  const title = product.title;
  const imageUrl =
    product.image?.url ||
    (product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.jpg");

  return (
    <div className="product-details-container">
      <div className="product-details-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="product-wrapper">
          <img src={imageUrl} className="product-img" alt={title} />
          <div className="details-box">
            <h2>{title}</h2>
            <p className="price">
              ₹{product.price} {product.oldPrice && <small>₹{product.oldPrice}</small>}
            </p>
            {product.description && <p className="desc">{product.description}</p>}
            <button className="product-add-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3>Related Products</h3>
            <div className="related-products-grid">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  className="related-product-card"
                  onClick={() => navigate(`/product/${item._id}`, { state: item })}
                >
                  <img
                    src={
                      item.images && item.images.length > 0 ? item.images[0].url : "/placeholder.jpg"
                    }
                    alt={item.tittle}
                  />
                  <p>{item.tittle}</p>
                  <p>₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
