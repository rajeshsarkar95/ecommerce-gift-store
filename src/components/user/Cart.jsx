import "../../styles/Cart.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const formatCartForWhatsapp = () => {
    if (cart.length === 0) return "";
    let message = "Hello! I want to order the following items:\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}\n`;
    });
    message += `Total: ₹${totalPrice}`;
    return encodeURIComponent(message);
  };
  const whatsappLink = `https://wa.me/918439390374?text=${formatCartForWhatsapp()}`;
  return (
    <div className="cart-page">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <h1>Your Cart</h1>

      {cart.length === 0 && <p className="empty-msg">Your cart is empty.</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={
              item.images?.[0]?.url 
              || item.images?.[0]  
              || "/placeholder.jpg"
            }
            alt={item.title}
          />

          <div>
            <h3>{item.title}</h3>
            <p>₹{item.price}</p>
            <div className="qty-controls">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
          <div className="item-total">₹{item.price * item.qty}</div>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h2>Total: ₹{totalPrice}</h2>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            Order via WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
