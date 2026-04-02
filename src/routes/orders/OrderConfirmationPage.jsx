import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  CheckCircle,
  Package,
  MapPin,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

function OrderConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-text/60 mb-4">No order information found.</p>
          <Link
            to="/dashboard"
            className="text-primary font-semibold hover:underline"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { order } = state;

  const formattedDate = new Date(order.date + "T00:00:00").toLocaleDateString(
    "en-NG",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Success header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle
            size={40}
            className="text-green-600"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-3xl font-extrabold text-text mb-2">
          Order Confirmed!
        </h1>
        <p className="text-text/60">
          Thank you for your purchase. We've received your order and are getting
          it ready.
        </p>
      </div>

      {/* Order ID banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-center mb-6">
        <p className="text-sm text-text/60 mb-1">Your Order ID</p>
        <p className="text-2xl font-extrabold text-primary tracking-wide">
          {order.id}
        </p>
        <p className="text-sm text-text/60 mt-1">Placed on {formattedDate}</p>
      </div>

      {/* Items ordered */}
      <div className="bg-section border border-text/10 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <Package size={18} className="text-primary" aria-hidden="true" />
          <h2 className="font-bold text-text">Items Ordered</h2>
        </div>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex justify-between items-center py-2 border-b border-text/5 last:border-0"
            >
              <div>
                <p className="text-text text-sm font-medium">{item.name}</p>
                <p className="text-text/50 text-xs">Qty: {item.quantity}</p>
              </div>
              <p className="text-text text-sm font-semibold">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 mt-2 border-t border-text/10">
          <span className="font-bold text-text">Order Total</span>
          <span className="font-bold text-text text-lg">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      {/* Shipping address */}
      {order.shippingAddress?.address && (
        <div className="bg-section border border-text/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-primary" aria-hidden="true" />
            <h2 className="font-bold text-text">Delivering To</h2>
          </div>
          <div className="text-text/70 text-sm space-y-1">
            <p className="font-semibold text-text">
              {order.shippingAddress.fullName}
            </p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zip}
            </p>
            <p>{order.shippingAddress.phone}</p>
          </div>
        </div>
      )}

      {/* What happens next */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 text-sm text-blue-800">
        <p className="font-semibold mb-2">What happens next?</p>
        <ol className="space-y-1.5 list-decimal list-inside text-blue-700">
          <li>You'll receive an email confirmation shortly.</li>
          <li>We'll notify you by SMS once your order is dispatched.</li>
          <li>Standard delivery: 3 – 5 business days.</li>
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/orders"
          className="flex-1 flex items-center justify-center gap-2 border border-border-main text-text font-semibold px-6 py-3 rounded-xl hover:bg-section transition-colors"
        >
          <Package size={16} aria-hidden="true" />
          View All Orders
        </Link>
        <Link
          to="/products"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition-all"
        >
          <ShoppingBag size={16} aria-hidden="true" />
          Continue Shopping
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
