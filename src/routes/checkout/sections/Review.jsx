import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import { useOrders } from "../../../contexts/OrdersContext";
import BouncingDots from "../../../components/Common/BouncingDots";
import toast from "react-hot-toast";
import ReviewCard from "../../../components/Checkout/ReviewCard";
import CartFooter from "../../../components/Cart/CartFooter";
import { formatCurrency } from "../../../utils/formatCurrency";

function Review() {
  const navigate = useNavigate();
  const { shippingInfo } = useOutletContext();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newOrder = addOrder({ cartItems, totalPrice, shippingInfo });
      clearCart();
      toast.success("Order placed! Your items are on the way.");
      // Navigate to confirmation page and pass the order data via location state.
      // Using state instead of URL params keeps sensitive data out of the URL.
      navigate("/order-confirmation", { state: { order: newOrder } });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ReviewCard
        title="Shipping Address"
        onEdit={() => navigate("/checkout/shipping")}
      >
        <div className="text-secondary space-y-1">
          <p className="font-bold text-text">{shippingInfo.fullName}</p>
          <p>{shippingInfo.address}</p>
          <p>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
          </p>
          <p className="mt-2">{shippingInfo.email}</p>
          <p>{shippingInfo.phone}</p>
        </div>
      </ReviewCard>

      <ReviewCard
        title="Payment Method"
        onEdit={() => navigate("/checkout/payment")}
      >
        <p className="text-secondary">Credit Card — secure payment</p>
      </ReviewCard>

      <ReviewCard title="Order Items">
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-text font-medium text-sm">{item.name}</p>
                  <p className="text-secondary text-xs">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-text font-semibold text-sm">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </ReviewCard>

      <CartFooter
        mode="review"
        totalPrice={totalPrice}
        onBack={() => navigate("/checkout/payment")}
        onAction={handlePlaceOrder}
        text={isLoading ? <BouncingDots /> : "Place Order"}
      />
    </div>
  );
}

export default Review;
