import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import CartFooter from "./cartFooter";

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

      <CartFooter
        mode="cart"
        totalPrice={totalPrice}
        totalCartCount={totalCartCount}
        onClose={onClose}
      />
    </div>
  );
}

export default ListItemsInCart;
