import { formatCurrency } from "../../utils/formatCurrency";

// Status badge colours
const STATUS_STYLES = {
  delivered:  "text-green-700  bg-green-50  border border-green-200",
  shipped:    "text-blue-700   bg-blue-50   border border-blue-200",
  processing: "text-yellow-700 bg-yellow-50 border border-yellow-200",
  cancelled:  "text-red-700    bg-red-50    border border-red-200",
};

// Capitalise the first letter for display
const formatStatus = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function RecentOrderCard({ id, date, status, items, total }) {
  const badgeClass = STATUS_STYLES[status] || "text-gray-600 bg-gray-50 border border-gray-200";

  // Format date from "2026-03-25" to "Mar 25, 2026"
  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-NG", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <article className="border-t border-text/10 px-6 py-5">
      {/* Order header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <p className="font-semibold text-text text-sm">Order {id}</p>
          <p className="text-text/60 text-xs mt-0.5">Placed on {formattedDate}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Status badge */}
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}>
            {formatStatus(status)}
          </span>
          {/* Order total */}
          <span className="font-bold text-text text-sm">
            {formatCurrency(total ?? items.reduce((s, i) => s + i.price * i.quantity, 0))}
          </span>
        </div>
      </div>

      {/* Items list */}
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={`${item.name}-${idx}`} className="flex justify-between items-center">
            <p className="text-text/70 text-sm">
              {item.name}
              <span className="text-text/40 ml-1">×{item.quantity}</span>
            </p>
            <p className="text-text/70 text-sm">{formatCurrency(item.price)}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default RecentOrderCard;
