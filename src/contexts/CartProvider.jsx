import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import saveCartToStorage from "../storage/saveCartToStorage";
import readCartFromStorage from "../storage/readCartFromStorage";

export function CartProvider({ children }) {
  const { user } = useAuth();

  const getCartKey = () =>
    user ? `zoozu-cart-${user.email}` : "zoozu-guest-cart";

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const currentKey = getCartKey();
    const savedData = readCartFromStorage(currentKey);
    setCartItems(savedData);
  }, [user]);

  useEffect(() => {
    const currentKey = getCartKey();
    saveCartToStorage(cartItems, currentKey);
  }, [cartItems, user]);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => String(item.id) === String(product.id),
      );
      if (existingItem) {
        toast.success(`${quantity} more ${product.name} added!`);
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (idToRemove) => {
    const itemToRemove = cartItems.find((item) => item.id === idToRemove);
    if (itemToRemove) toast.error(`${itemToRemove.name} removed from cart`);
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
          item.id === product.id
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
