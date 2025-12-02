import "../../styles/Cart.css";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeItem, increaseQty, decreaseQty } = useCart();
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 && (
        <p className="empty-msg">Your cart is empty.</p>
      )}
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} />
          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <div className="qty-controls">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
          <div className="item-total">₹{item.price * item.qty}</div>
        </div>
      ))}
    </div>
  );
}
