import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../../contexts/CartContext";
import { useInfo } from "../../../contexts/InfoContext";
import toast from "react-hot-toast";
import ReviewCard from "../../../components/checkout/ReviewCard";
import CartFooter from "../../../components/Cart/cartFooter";

function Review() {
  const navigate = useNavigate();
  const { totalPrice } = useCart();
  const { shippingInfo } = useInfo();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("your order is on it's way");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
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
        </div>
      </ReviewCard>

      <ReviewCard
        title="Payment Method"
        onEdit={() => navigate("/checkout/payment")}
      >
        <p className="text-secondary">
          Credit Card ending in{" "}
          <span className="text-text font-medium">4242</span>
        </p>
      </ReviewCard>

      <CartFooter
        mode="review"
        totalPrice={totalPrice}
        onBack={() => navigate("/checkout/payment")}
        onAction={handlePlaceOrder}
        text={!isLoading ? "place order" : "placing order..."}
      />
    </div>
  );
}

export default Review;
