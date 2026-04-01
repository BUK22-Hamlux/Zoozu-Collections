import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { getUserCart, saveUserCart } from "../storage/userStorage";

export function CartProvider({ children }) {
  const { user } = useAuth();

  // When the logged-in user changes (login/logout), reload the cart
  // from that user's record in the users list.
  const [cartItems, setCartItems] = useState(() =>
    user ? getUserCart(user.email) : [],
  );

  // Reload cart when user changes (different user logs in)
  useEffect(() => {
    setCartItems(user ? getUserCart(user.email) : []);
  }, [user?.email]);

  // Persist cart into the user's record on every change
  useEffect(() => {
    if (user?.email) {
      saveUserCart(user.email, cartItems);
    }
  }, [cartItems, user?.email]);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const addToCart = (product, quantity = 1) => {
    const exists = cartItems.find((i) => String(i.id) === String(product.id));
    if (exists) toast.success(`${quantity} more ${product.name} added!`);
    else toast.success(`${product.name} added to cart!`);

    setCartItems((prev) => {
      if (exists) {
        return prev.map((i) =>
          String(i.id) === String(product.id)
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) toast.error(`${item.name} removed from cart`);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const increaseQuantity = (product) =>
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );

  const decreaseQuantity = (product) =>
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === product.id);
      if (item?.quantity === 1)
        toast.error(`${product.name} removed from cart`);
      return prev
        .map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0);
    });

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartCount,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
