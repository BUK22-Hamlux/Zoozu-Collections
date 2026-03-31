import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ_CATEGORIES = [
  {
    category: "Orders & Payments",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, then fill in your shipping details and payment information. You'll receive a confirmation email once your order is placed.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We currently accept credit and debit cards (Visa, Mastercard, Verve). Bank transfers are available for orders above ₦50,000. We're working on adding PayPal and Apple Pay.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "You can cancel or modify your order within 2 hours of placing it, as long as it has not yet been dispatched. Contact us immediately at support@zoozu.com or call us on +234 801 234 5678.",
      },
      {
        q: "Why was my payment declined?",
        a: "Payments can be declined for several reasons — insufficient funds, incorrect card details, or your bank blocking the transaction. Try a different card or contact your bank. If the issue persists, reach out to our support team.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3 – 5 business days nationwide. Express delivery (1 – 2 days) is available in Lagos, Abuja, and Port Harcourt. Same-day delivery is available in Lagos for orders placed before 12pm.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is dispatched, you'll receive an SMS with a tracking number. You can also check the status of your order in the Orders section of your dashboard.",
      },
      {
        q: "Do you deliver outside Nigeria?",
        a: "Currently we only deliver within Nigeria. International shipping is something we're actively working on. Sign up to our newsletter to be the first to know when it launches.",
      },
      {
        q: "What happens if no one is home during delivery?",
        a: "Our courier will attempt delivery twice. If unsuccessful, the package is held at a nearby pickup point for 3 days before being returned. Contact us to rearrange delivery.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery for items that are unworn, unwashed, and have original tags attached. Damaged or incorrect items are always refundable regardless of condition.",
      },
      {
        q: "How long does a refund take?",
        a: "Bank transfer refunds take 3 – 5 business days. Card refunds take 5 – 10 business days depending on your bank. Store credit is applied instantly and never expires.",
      },
      {
        q: "Do I pay for return shipping?",
        a: "Return shipping is free if the item is damaged, defective, or incorrect. For change-of-mind returns, you cover the return shipping cost.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      {
        q: "How do I know what size to order?",
        a: "Each product page includes a size guide specific to that item. We recommend measuring yourself and comparing against the guide rather than going by your usual size, as sizing varies between traditional garment styles.",
      },
      {
        q: "Are the colours accurate in the photos?",
        a: "We make every effort to photograph products accurately. Slight variations may occur due to screen calibration differences. If colour accuracy is critical, contact us and we can send additional reference photos.",
      },
      {
        q: "Can I request a custom or made-to-measure order?",
        a: "Yes! We offer custom orders for select products. Contact us with your measurements and requirements and we'll confirm availability, pricing, and lead time. Custom orders are non-refundable.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    items: [
      {
        q: "How do I reset my password?",
        a: 'On the login page, click "Forgot Password?" and enter your email address. You\'ll receive a reset link within a few minutes. Check your spam folder if you don\'t see it.',
      },
      {
        q: "How is my personal data used?",
        a: "Your data is used solely to process orders, improve your shopping experience, and send you relevant communications if you've opted in. We never sell your data to third parties. See our Privacy Policy for full details.",
      },
      {
        q: "How do I delete my account?",
        a: "To delete your account, contact us at support@zoozu.com. We'll process your request within 7 business days. Note that order history and any outstanding refunds must be resolved before deletion.",
      },
    ],
  },
];

// Single accordion item
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-text/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left hover:text-primary transition-colors"
      >
        <span className="font-semibold text-text text-sm">{q}</span>
        {open
          ? <ChevronUp  size={16} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
          : <ChevronDown size={16} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
        }
      </button>
      {open && (
        <p className="text-text/70 text-sm pb-5 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].category);

  const current = FAQ_CATEGORIES.find((c) => c.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
          <HelpCircle size={26} className="text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-text mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-text/60 max-w-md mx-auto">
          Can't find an answer? We're happy to help —{" "}
          <Link to="/contact" className="text-primary hover:underline font-medium">
            contact our support team
          </Link>.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Category sidebar */}
        <nav aria-label="FAQ categories" className="md:w-52 shrink-0">
          <ul className="flex md:flex-col gap-2 flex-wrap">
            {FAQ_CATEGORIES.map(({ category }) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "text-text/70 hover:bg-section hover:text-text"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* FAQ items */}
        <div className="flex-1 bg-section border border-text/10 rounded-2xl px-6">
          <h2 className="font-bold text-text text-lg pt-6 pb-2">
            {current?.category}
          </h2>
          {current?.items.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>

      {/* Still need help */}
      <div className="mt-10 bg-section border border-text/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="font-bold text-text">Still have questions?</p>
          <p className="text-text/60 text-sm">
            Our support team is available Monday – Saturday, 9am – 6pm.
          </p>
        </div>
        <Link
          to="/contact"
          className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition-all shrink-0"
        >
          Get in Touch <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default FAQPage;
