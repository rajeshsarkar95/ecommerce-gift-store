import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    if (!product.id) {
      console.error("Product must have a unique id");
      return;
    }

    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      // Update quantity if product already in cart
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        )
      );
    } else {
      // Add new product
      setCart([...cart, { ...product, qty: quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};
