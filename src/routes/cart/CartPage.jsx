import React from "react";
import { useCart } from "../../contexts/CartContext";
import EmptyCart from "../../components/Cart/EmptyCart";
import { useNavigate } from "react-router-dom";
import ListItemsInCart from "../../components/Cart/CartItems";

function CartPage() {
  const navigate = useNavigate();
  const { totalCartCount } = useCart();
  return (
    <div className="min-h-screen">
      {totalCartCount === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <EmptyCart onClose={() => navigate("/products")} />
        </div>
      ) : (
        <div>
          <h2 className="text-text font-bold text-4xl p-6">Shopping Cart</h2>
          <ListItemsInCart onClose={() => navigate("/products")} />
        </div>
      )}
    </div>
  );
}

export default CartPage;
