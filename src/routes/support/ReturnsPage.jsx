import { RefreshCcw, CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RETURNABLE = [
  "Item arrived damaged or defective",
  "Wrong item delivered",
  "Item significantly different from description",
  "Item is unworn, unwashed, and has original tags attached",
  "Return request submitted within 30 days of delivery",
];

const NOT_RETURNABLE = [
  "Items that have been worn, washed, or altered",
  "Items without original packaging or tags",
  "Sale or clearance items (marked as final sale)",
  "Custom or made-to-order pieces",
  "Items returned after the 30-day window",
];

const RETURN_STEPS = [
  {
    n: "01",
    title: "Submit a Request",
    body: 'Email support@zoozu.com with your order ID and the reason for return. Attach clear photos of the item.',
  },
  {
    n: "02",
    title: "Approval",
    body: "Our team reviews your request within 2 business days and sends you a return authorisation number.",
  },
  {
    n: "03",
    title: "Ship It Back",
    body: "Pack the item securely and write your return authorisation number on the package. Ship to our Lagos address.",
  },
  {
    n: "04",
    title: "Refund or Exchange",
    body: "Once we receive and inspect the item (2 – 3 days), we process your refund or send a replacement.",
  },
];

function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
          <RefreshCcw size={26} className="text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-text mb-3">Returns & Refunds</h1>
        <p className="text-text/60 max-w-md mx-auto">
          Not happy with your order? We offer a straightforward 30-day return
          policy on eligible items.
        </p>
      </div>

      {/* Policy summary banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10 text-center">
        <p className="text-3xl font-extrabold text-primary mb-1">30 Days</p>
        <p className="text-text font-semibold">Return window from delivery date</p>
        <p className="text-text/60 text-sm mt-1">Free returns on damaged or incorrect items</p>
      </div>

      {/* Eligible / not eligible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-section border border-text/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle size={18} className="text-green-600" aria-hidden="true" />
            <h2 className="font-bold text-text">Eligible for Return</h2>
          </div>
          <ul className="space-y-3">
            {RETURNABLE.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text/70">
                <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-section border border-text/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <XCircle size={18} className="text-red-500" aria-hidden="true" />
            <h2 className="font-bold text-text">Not Eligible for Return</h2>
          </div>
          <ul className="space-y-3">
            {NOT_RETURNABLE.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text/70">
                <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How to return */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-6">How to Return an Item</h2>
        <div className="space-y-4">
          {RETURN_STEPS.map(({ n, title, body }) => (
            <div key={n} className="flex items-start gap-5 bg-section border border-text/10 rounded-xl p-5">
              <span className="text-3xl font-extrabold text-primary/30 shrink-0 leading-none">{n}</span>
              <div>
                <p className="font-bold text-text mb-1">{title}</p>
                <p className="text-text/60 text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Refund timelines */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text mb-6">Refund Timelines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { method: "Bank Transfer",  time: "3 – 5 business days", icon: Clock },
            { method: "Card Refund",    time: "5 – 10 business days", icon: Clock },
            { method: "Store Credit",   time: "Instant",              icon: CheckCircle },
          ].map(({ method, time, icon: Icon }) => (
            <div key={method} className="bg-section border border-text/10 rounded-xl p-5 text-center">
              <Icon size={20} className="text-primary mx-auto mb-3" aria-hidden="true" />
              <p className="font-semibold text-text text-sm mb-1">{method}</p>
              <p className="text-text/60 text-xs">{time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-section border border-text/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-text">Ready to start a return?</p>
          <p className="text-text/60 text-sm">Our support team will guide you through the process.</p>
        </div>
        <Link
          to="/contact"
          className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition-all shrink-0"
        >
          Contact Support <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default ReturnsPage;
