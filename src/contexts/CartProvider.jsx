import { useState } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // CartProvider.jsx
  const addToCart = (product, quantity = 1) => {
    // Added quantity parameter
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === product.name);
      if (existingItem) {
        toast.success(`${quantity} more ${product.name} added!`);
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity } // Add the specific amount
            : item,
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity: quantity }]; // Start with the chosen amount
    });
  };

  const removeFromCart = (idToRemove) => {
    const itemToRemove = cartItems.find((item) => item.id === idToRemove);

    // 2. Trigger the toast using the found item's name
    if (itemToRemove) {
      toast.error(`${itemToRemove.name} removed from cart`);
    }

    setCartItems((prev) => prev.filter((item) => item.id !== idToRemove));
  };

  const increaseQuantity = (product) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === product.name);

      if (existingItem && existingItem.quantity === 1) {
        toast.error(`${product.name} removed from cart`);
      }

      return prev
        .map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const value = {
    cartItems,
    totalCartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
