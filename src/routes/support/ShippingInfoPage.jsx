import { Truck, Clock, MapPin, Shield, Package, AlertCircle } from "lucide-react";

const SHIPPING_OPTIONS = [
  {
    name: "Standard Delivery",
    duration: "3 – 5 business days",
    cost: "₦1,500",
    note: "Free on orders over ₦100,000",
    icon: Truck,
    highlight: false,
  },
  {
    name: "Express Delivery",
    duration: "1 – 2 business days",
    cost: "₦3,500",
    note: "Available in Lagos, Abuja & Port Harcourt",
    icon: Clock,
    highlight: true,
  },
  {
    name: "Same Day Delivery",
    duration: "Within 6 hours",
    cost: "₦6,000",
    note: "Lagos Island & Mainland only. Order before 12pm",
    icon: MapPin,
    highlight: false,
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Order Confirmed", body: "You receive an email confirmation immediately after placing your order." },
  { step: "02", title: "Processing",      body: "We verify your payment and prepare your items. This takes 1 – 24 hours." },
  { step: "03", title: "Dispatched",      body: "Your order is handed to the courier. You'll receive a tracking number by SMS." },
  { step: "04", title: "Delivered",       body: "Your package arrives at your door. Please inspect it before signing." },
];

function ShippingInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
          <Truck size={26} className="text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-text mb-3">Shipping Information</h1>
        <p className="text-text/60 max-w-md mx-auto">
          We deliver across Nigeria. Here's everything you need to know
          about our shipping options and timelines.
        </p>
      </div>

      {/* Shipping options */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-6">Delivery Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SHIPPING_OPTIONS.map(({ name, duration, cost, note, icon: Icon, highlight }) => (
            <div
              key={name}
              className={`rounded-xl p-6 border ${
                highlight
                  ? "border-primary bg-primary/5"
                  : "border-text/10 bg-section"
              }`}
            >
              {highlight && (
                <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3">
                  Most Popular
                </span>
              )}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${highlight ? "bg-primary/20 text-primary" : "bg-text/10 text-text"}`}>
                <Icon size={18} aria-hidden="true" />
              </div>
              <h3 className="font-bold text-text mb-1">{name}</h3>
              <p className="text-text/60 text-sm mb-3">{duration}</p>
              <p className="text-2xl font-bold text-text mb-1">{cost}</p>
              <p className="text-text/50 text-xs">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-6">How It Works</h2>
        <div className="space-y-4">
          {PROCESS_STEPS.map(({ step, title, body }) => (
            <div key={step} className="flex items-start gap-5 bg-section border border-text/10 rounded-xl p-5">
              <span className="text-3xl font-extrabold text-primary/30 shrink-0 leading-none">
                {step}
              </span>
              <div>
                <p className="font-bold text-text mb-1">{title}</p>
                <p className="text-text/60 text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage + policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-section border border-text/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package size={20} className="text-primary" aria-hidden="true" />
            <h3 className="font-bold text-text">Delivery Coverage</h3>
          </div>
          <ul className="text-text/70 text-sm space-y-2">
            <li>✓ All 36 states + FCT Abuja</li>
            <li>✓ Same-day available in Lagos</li>
            <li>✓ Express available in major cities</li>
            <li>✓ Remote areas — add 2 extra days</li>
          </ul>
        </div>

        <div className="bg-section border border-text/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-primary" aria-hidden="true" />
            <h3 className="font-bold text-text">Package Protection</h3>
          </div>
          <ul className="text-text/70 text-sm space-y-2">
            <li>✓ Every order is securely packaged</li>
            <li>✓ Fragile items receive extra padding</li>
            <li>✓ Damaged-in-transit orders replaced free</li>
            <li>✓ Photo evidence required within 24 hrs</li>
          </ul>
        </div>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
        <AlertCircle size={18} className="text-yellow-700 mt-0.5 shrink-0" aria-hidden="true" />
        <p className="text-yellow-800 text-sm">
          <strong>Public holidays and weekends</strong> are not counted as business days. 
          Orders placed on Friday after 3pm will begin processing the following Monday.
        </p>
      </div>
    </div>
  );
}

export default ShippingInfoPage;
