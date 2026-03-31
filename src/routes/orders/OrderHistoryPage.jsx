import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../contexts/OrdersContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Package, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";

// Status config: style + label for every possible status
const STATUS_CONFIG = {
  processing: { label: "Processing",  badge: "text-yellow-700 bg-yellow-50 border border-yellow-200" },
  shipped:    { label: "Shipped",     badge: "text-blue-700   bg-blue-50   border border-blue-200"   },
  delivered:  { label: "Delivered",   badge: "text-green-700  bg-green-50  border border-green-200"  },
  cancelled:  { label: "Cancelled",   badge: "text-red-700    bg-red-50    border border-red-200"    },
};

const ALL_STATUSES = ["all", "processing", "shipped", "delivered", "cancelled"];

// Format ISO date string for display
function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-NG", {
    year: "numeric", month: "long", day: "numeric",
  });
}

// Single expandable order row
function OrderRow({ order }) {
  const [expanded, setExpanded] = useState(false);
  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.processing;

  return (
    <article className="bg-section border border-text/10 rounded-xl overflow-hidden">
      {/* Header — always visible, click to expand */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 text-left hover:bg-text/5 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2.5 rounded-lg mt-0.5" aria-hidden="true">
            <Package size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-text">{order.id}</p>
            <p className="text-text/60 text-sm mt-0.5">{formatDate(order.date)}</p>
            <p className="text-text/60 text-sm">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:flex-col sm:items-end">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.badge}`}>
            {config.label}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-text">
              {formatCurrency(order.total ?? order.items.reduce((s, i) => s + i.price * i.quantity, 0))}
            </span>
            {expanded
              ? <ChevronUp  size={16} className="text-secondary" aria-hidden="true" />
              : <ChevronDown size={16} className="text-secondary" aria-hidden="true" />
            }
          </div>
        </div>
      </button>

      {/* Expanded detail — items + shipping address */}
      {expanded && (
        <div className="border-t border-text/10 px-6 py-5 space-y-5">
          {/* Items */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-3">Items Ordered</h3>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="flex justify-between items-center py-2 border-b border-text/5 last:border-0">
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

            {/* Order total row */}
            <div className="flex justify-between items-center pt-3 mt-1 border-t border-text/10">
              <span className="font-bold text-text text-sm">Order Total</span>
              <span className="font-bold text-text">
                {formatCurrency(order.total ?? order.items.reduce((s, i) => s + i.price * i.quantity, 0))}
              </span>
            </div>
          </div>

          {/* Shipping address — only shown if it was saved with the order */}
          {order.shippingAddress?.address && (
            <div>
              <h3 className="text-sm font-semibold text-text mb-2">Shipping Address</h3>
              <div className="text-text/60 text-sm space-y-0.5">
                <p className="font-medium text-text">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
function OrderHistoryPage() {
  const { orders } = useOrders();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredOrders = activeFilter === "all"
    ? orders
    : orders.filter((o) => o.status === activeFilter);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Order History</h1>
        <p className="text-text/60 mt-1">
          {orders.length} order{orders.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {orders.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-section p-6 rounded-full mb-5">
            <ShoppingBag size={48} className="text-secondary opacity-40" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-text mb-2">No orders yet</h2>
          <p className="text-secondary mb-6 max-w-xs">
            When you place your first order it will appear here.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition-all"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          {/* Status filter tabs */}
          <div
            className="flex gap-2 flex-wrap mb-6"
            role="group"
            aria-label="Filter orders by status"
          >
            {ALL_STATUSES.map((status) => {
              // Count how many orders match this status
              const count = status === "all"
                ? orders.length
                : orders.filter((o) => o.status === status).length;

              // Don't show a filter tab if no orders have that status
              if (status !== "all" && count === 0) return null;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setActiveFilter(status)}
                  aria-pressed={activeFilter === status}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
                    activeFilter === status
                      ? "bg-primary text-white border-primary"
                      : "bg-section text-text border-text/10 hover:border-text/30"
                  }`}
                >
                  {status === "all"
                    ? `All (${count})`
                    : `${STATUS_CONFIG[status]?.label ?? status} (${count})`}
                </button>
              );
            })}
          </div>

          {/* Order list */}
          {filteredOrders.length === 0 ? (
            <p className="text-center text-secondary py-12">
              No {activeFilter} orders found.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OrderHistoryPage;
