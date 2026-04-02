import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Truck, CreditCard, CheckCircle } from "lucide-react";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import { useCart } from "../../contexts/CartContext";

function CheckoutPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, []);
  const isShipping = pathname.includes("shipping");
  const isPayment = pathname.includes("payment");
  const isReview = pathname.includes("review");

  return (
    <div className="min-h-screen bg-background text-text p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <NavLink
          to="/cart"
          className="flex items-center text-secondary hover:text-primary mb-6 transition-colors"
        >
          <ChevronLeft size={20} aria-hidden="true" />
          <span>Back to Cart</span>
        </NavLink>

        <h1 className="text-4xl font-bold mb-12">Checkout</h1>

        <div className="flex justify-between items-center mb-12 relative px-8">
          <div
            className="absolute top-6 left-20 right-20 h-0.5 bg-border-main z-0"
            aria-hidden="true"
          />
          <CheckoutSteps
            icon={Truck}
            label="Shipping"
            isActive={isShipping}
            isCompleted={isPayment || isReview}
          />
          <CheckoutSteps
            icon={CreditCard}
            label="Payment"
            isActive={isPayment}
            isCompleted={isReview}
          />
          <CheckoutSteps
            icon={CheckCircle}
            label="Review"
            isActive={isReview}
            isCompleted={false}
          />
        </div>

        <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Outlet context={{ shippingInfo, setShippingInfo }} />
        </main>
      </div>
    </div>
  );
}

export default CheckoutPage;
