import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";
import saveCartToStorage from "../storage/saveCartToStorage";
import readCartFromStorage from "../storage/readCartFromStorage";

const CART_KEY = "zoozu-cart-items";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    readCartFromStorage(CART_KEY),
  );

  useEffect(() => {
    saveCartToStorage(cartItems, CART_KEY);
  }, [cartItems]);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(
      (item) => String(item.id) === String(product.id),
    );

    if (existingItem) {
      toast.success(`${quantity} more ${product.name} added!`);
    } else {
      toast.success(`${product.name} added to cart!`);
    }

    setCartItems((prev) => {
      if (existingItem) {
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity: quantity }];
    });
  };

  const removeFromCart = (idToRemove) => {
    const itemToRemove = cartItems.find((item) => item.id === idToRemove);

    if (itemToRemove) {
      toast.error(`${itemToRemove.name} removed from cart`);
    }

    setCartItems((prev) => prev.filter((item) => item.id !== idToRemove));
  };

  const increaseQuantity = (product) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

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

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    totalCartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
