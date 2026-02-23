import Button from "../Common/Button";
import { ShoppingBag } from "lucide-react";

function EmptyCart({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-full">
      <ShoppingBag className="text-gray-300" size={80} />
      <p className="text-gray-700">Your cart is empty</p>
      <Button onClick={onClose} text="Continue Shopping" type="primary" />
    </div>
  );
}

export default EmptyCart;
