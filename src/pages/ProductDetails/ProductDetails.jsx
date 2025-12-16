import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams(); 
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading product...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Product not found</h2>;

  const folder = product.folder || "products";

  return (
    <div className="product-details-page">
      <div className="product-wrapper">

        {/* Product Image */}
        <img
          src={`http://localhost:5000/uploads/${folder}/${product.images[0]}`}
          alt={product.title}
          className="product-img"
        />

        <div className="details-box">
          {/* Product Title */}
          <h2>{product.title}</h2>

          {/* Product Price */}
          <p className="price">
            ₹{product.price}{" "}
            {product.oldPrice && <small>₹{product.oldPrice}</small>}
          </p>

          {/* Product Description */}
          <p className="desc">{product.description}</p>

          {/* Add to Cart */}
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
