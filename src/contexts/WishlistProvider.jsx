import { useState, useEffect } from "react";
import { WishlistContext } from "./WishlistContext";
import { useAuth } from "./AuthContext";
import { updateUserRecord, getUserRecord } from "../storage/userStorage";
import toast from "react-hot-toast";

export function WishlistProvider({ children }) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState(() =>
    user ? getUserRecord(user.email)?.wishlist || [] : [],
  );

  useEffect(() => {
    setWishlist(user ? getUserRecord(user.email)?.wishlist || [] : []);
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      updateUserRecord(user.email, { wishlist });
    }
  }, [wishlist, user?.email]);

  const isWishlisted = (productId) =>
    wishlist.some((item) => String(item.id) === String(productId));

  const toggleWishlist = (product) => {
    if (!user) {
      toast.error("Please log in to save items to your wishlist.");
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some(
        (item) => String(item.id) === String(product.id),
      );
      if (exists) {
        toast("Removed from wishlist", { icon: "💔" });
        return prev.filter((item) => String(item.id) !== String(product.id));
      }
      toast.success("Added to wishlist!");
      return [...prev, product];
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isWishlisted, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
