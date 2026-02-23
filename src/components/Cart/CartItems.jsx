import { Trash2, Minus, Plus } from "lucide-react";
import Button from "../Common/Button";
import { useCart } from "../../contexts/CartContext";

function ListItemsInCart({ onClose }) {
  const {
    cartItems,
    totalCartCount,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="flex flex-col h-full">
      <div className=" overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 items-center justify-between border-t border-t-slate-200 pb-4 bg-background"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-25 h-25 object-cover rounded-md"
              />
              <div>
                <p className="font-medium text-text">{item.name}</p>
                <p className="text-text/70">₦{item.price.toLocaleString()}</p>
                <div className="flex items-center text-gray-700 space-x-6 mt-4">
                  <Minus
                    size={20}
                    onClick={() => decreaseQuantity(item)}
                    className="cursor-pointer text-text/70"
                  />
                  <p className="text-lg text-text/70">{item.quantity}</p>
                  <Plus
                    size={20}
                    onClick={() => increaseQuantity(item)}
                    className="cursor-pointer text-text/70"
                  />
                </div>
              </div>
            </div>
            <Trash2
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <footer className="p-4 border-t border-t-slate-100">
        <div className="flex justify-between text-text">
          <p>
            Total {totalCartCount} item{totalCartCount > 1 ? "s" : ""}
          </p>
          <p className="font-semibold">₦{totalPrice.toLocaleString()}</p>
        </div>
        <Button
          text="Checkout"
          type="primary"
          optionalClassName="w-full mt-4"
          onClick={onClose}
        />
      </footer>
    </div>
  );
}

export default ListItemsInCart;
