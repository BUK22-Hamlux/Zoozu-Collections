import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import BouncingDots from "../../components/Common/BouncingDots";
import toast from "react-hot-toast";

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@zoozu.com",
    sub: "We reply within 24 hours",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+234 801 234 5678",
    sub: "Mon – Sat, 9am – 6pm WAT",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "14 Balogun Street, Lagos Island",
    sub: "Lagos, Nigeria",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Mon – Sat: 9am – 6pm",
    sub: "Sunday: Closed",
    color: "bg-orange-500/10 text-orange-600",
  },
];

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Page header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
          <MessageSquare
            size={26}
            className="text-primary"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-4xl font-bold text-text mb-3">Contact Us</h1>
        <p className="text-text/60 max-w-md mx-auto">
          Have a question or need help? We're here for you. Reach out and we'll
          respond as quickly as we can.
        </p>
      </div>

      {/* Contact method cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {CONTACT_METHODS.map((method) => {
          const IconComponent = method.icon;
          <div
            key={method.title}
            className="bg-section border border-text/10 rounded-xl p-5"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${method.color}`}
            >
              <IconComponent size={18} aria-hidden="true" />
            </div>
            <p className="font-semibold text-text text-sm mb-1">
              {method.title}
            </p>
            <p className="text-text text-sm">{method.detail}</p>
            <p className="text-text/50 text-xs mt-1">{method.sub}</p>
          </div>;
        })}
      </div>

      {/* Contact form */}
      <div className="bg-section border border-text/10 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-text mb-6">Send us a message</h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-sm font-semibold text-text"
              >
                Full Name{" "}
                <span aria-hidden="true" className="text-red-500">
                  *
                </span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="px-4 py-3 rounded-lg bg-background border border-border-main text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-sm font-semibold text-text"
              >
                Email Address{" "}
                <span aria-hidden="true" className="text-red-500">
                  *
                </span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="px-4 py-3 rounded-lg bg-background border border-border-main text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-subject"
              className="text-sm font-semibold text-text"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="px-4 py-3 rounded-lg bg-background border border-border-main text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="text-sm font-semibold text-text"
            >
              Message{" "}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us how we can help..."
              required
              className="px-4 py-3 rounded-lg bg-background border border-border-main text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:brightness-110 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed min-w-40"
          >
            {isLoading ? (
              <BouncingDots />
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
