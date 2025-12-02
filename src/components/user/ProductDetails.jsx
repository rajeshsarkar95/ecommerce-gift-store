import { useLocation, useParams } from "react-router-dom";
import "../../styles/ProductDetails.css"
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const product = location.state;
  if (!product) return <h2>Product not found</h2>;
  return (
    <div className="product-details-page">
      <div className="product-wrapper">
        <img src={product.image} className="product-img" alt={product.name} />
        <div className="details-box">
          <h2>{product.name}</h2>
          <p className="price">
            ₹{product.price} <small>₹{product.oldPrice}</small>
          </p>
          <p className="desc">{product.description}</p>
          <button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
