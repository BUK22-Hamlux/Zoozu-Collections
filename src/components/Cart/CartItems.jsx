import { Trash2, Minus, Plus } from "lucide-react";
import Button from "../Common/Button";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/formatCurrency";

function ListItemsInCart({ onClose }) {
  const {
    cartItems,
    totalCartCount,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();

  const TAX_RATE = 0.05;
  const SHIPPING_RATE = 0.02;
  const FREE_SHIPPING_THRESHOLD = 100000;

  const tax = totalPrice * TAX_RATE;
  const isFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : totalPrice * SHIPPING_RATE;
  const grandTotal = totalPrice + shippingFee + tax;

  return (
    <div className="flex p-4 flex-col gap-8 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 items-center justify-between rounded-2xl border border-text/10 bg-section"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <p className="font-medium text-text">{item.name}</p>
                <p className="text-text/70">{formatCurrency(item.price)}</p>
                <div className="flex items-center text-gray-700 space-x-6 mt-4">
                  <Minus
                    size={20}
                    onClick={() => decreaseQuantity(item)}
                    className="cursor-pointer text-text/70 hover:text-text"
                  />
                  <span className="text-lg text-text/70">{item.quantity}</span>
                  <Plus
                    size={20}
                    onClick={() => increaseQuantity(item)}
                    className="cursor-pointer text-text/70 hover:text-text"
                  />
                </div>
              </div>
            </div>
            <Trash2
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
        ))}
      </div>

      <footer className="p-4 border border-text/10 rounded-2xl bg-section">
        <h2 className="text-text font-bold text-2xl mb-6">Order Summary</h2>

        <div className="text-text/70 space-y-3 mb-6">
          <div className="flex justify-between">
            <span>Total items</span>
            <span>{totalCartCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span
              className={isFreeShipping ? "text-green-500 font-medium" : ""}
            >
              {isFreeShipping ? "FREE" : formatCurrency(shippingFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
        </div>

        <div className="flex justify-between text-text font-bold text-xl pt-4 border-t border-text/10">
          <h2>Total</h2>
          <h2>{formatCurrency(grandTotal)}</h2>
        </div>
        {!isFreeShipping && (
          <p className="text-text/70 text-sm mt-2">
            Add ₦{FREE_SHIPPING_THRESHOLD - grandTotal} more to get free
            shipping
          </p>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <Button
            text="Checkout"
            type="primary"
            optionalClassName="w-full"
            onClick={() => toast.error("checkout not available")}
          />
          <Button
            text="Continue shopping"
            optionalClassName="w-full bg-section hover:bg-background border border-text/10"
            onClick={() => {
              navigate("/products");
            }}
          />
        </div>
      </footer>
    </div>
  );
}

export default ListItemsInCart;
