import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/ProductDetails.css";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (location.state) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(location.state);
      localStorage.setItem(
        "product_" + id,
        JSON.stringify(location.state)
      );
    } else {
      const stored = localStorage.getItem("product_" + id);
      if (stored) setProduct(JSON.parse(stored));
    }
  }, [id, location.state]);

  if (!product) return <h2>Product not found</h2>;

  const title = product.title || product.tittle;

  const imageBaseUrl = `http://localhost:5000/uploads/${product.folder}`;

  return (
    <div className="product-details-page">
      <div className="product-wrapper">
        {product.images?.length > 0 && (
          <img
            src={`${imageBaseUrl}/${product.images[0]}`}
            className="product-img"
            alt={title}
          />
        )}

        <div className="details-box">
          <h2>{title}</h2>

          <p className="price">
            ₹{product.price}
            {product.oldPrice && <small> ₹{product.oldPrice}</small>}
          </p>

          {product.description && (
            <p className="desc">{product.description}</p>
          )}

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
