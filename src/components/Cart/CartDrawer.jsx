import Overlay from "../Common/Overlay";
import { X } from "lucide-react";
import ListItemsInCart from "./CartItems";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../contexts/CartContext";

function CartView({ onClose }) {
  const { totalCartCount } = useCart();

  return (
    <div className="fixed inset-0 h-screen z-51 flex justify-end ">
      <Overlay onClose={onClose} />

      <div className="w-full sm:w-1/2 md:1/3 h-screen bg-background flex flex-col z-51 shadow-lg">
        <div className="flex justify-between items-center px-4 py-8 text-text/70 border-b border-text/50">
          <h2 className="">Shopping Cart</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="h-full flex flex-col overflow-hidden">
          {totalCartCount === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <ListItemsInCart onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CartView;
