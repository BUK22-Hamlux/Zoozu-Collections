import React from "react";
import { useCart } from "../../contexts/CartContext";
import { Box, Clock, ShoppingBagIcon } from "lucide-react";

function CartSummary() {
  const { totalCartCount, totalPrice } = useCart();
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      <div className="flex justify-between items-center p-6 bg-section rounded-lg">
        <div className="">
          <p className="text-text/50">Cart Items</p>
          <h3 className="text-text font-bold text-4xl">{totalCartCount}</h3>
        </div>
        <div className="bg-blue-500/10 p-2 rounded-lg">
          <ShoppingBagIcon className=" text-blue-500" />
        </div>
      </div>

      <div className="flex justify-between items-center p-6 bg-section rounded-lg">
        <div className="">
          <p className="text-text/50">Cart Total</p>
          <h3 className="text-text font-bold text-4xl">₦{totalPrice}</h3>
        </div>
        <div className="bg-green-500/10 p-2 rounded-lg">
          <Box className=" text-green-500" />
        </div>
      </div>

      <div className="flex justify-between items-center p-6 bg-section rounded-lg">
        <div className="">
          <p className="text-text/50">Total Orders</p>
          <h3 className="text-text font-bold text-4xl">{totalCartCount}</h3>
        </div>
        <div className="bg-purple-500/10 p-2 rounded-lg">
          <Clock className=" text-purple-500" />
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
