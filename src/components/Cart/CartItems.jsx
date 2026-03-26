import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import CartFooter from "./CartFooter";

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
                width={80}
                height={80}
                loading="lazy"
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <p className="font-medium text-text">{item.name}</p>
                <p className="text-text/70">{formatCurrency(item.price)}</p>

                <div className="flex items-center space-x-3 mt-4">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="p-1 rounded hover:bg-background text-text/70 hover:text-text transition-colors"
                  >
                    <Minus size={20} aria-hidden="true" />
                  </button>

                  {/* aria-live="polite" announces quantity changes to screen readers */}
                  <span
                    className="text-lg text-text/70 min-w-6 text-center"
                    aria-live="polite"
                    aria-label={`Quantity: ${item.quantity}`}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="p-1 rounded hover:bg-background text-text/70 hover:text-text transition-colors"
                  >
                    <Plus size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              className="p-1 rounded hover:bg-background transition-colors"
            >
              <Trash2
                className="text-red-500 hover:scale-110 transition-transform"
                aria-hidden="true"
              />
            </button>
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
