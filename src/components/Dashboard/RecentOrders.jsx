import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { useOrders } from "../../contexts/OrdersContext";
import RecentOrderCard from "./RecentOrderCard";

const MAX_DASHBOARD_ORDERS = 3;

function RecentOrders() {
  const { orders } = useOrders();

  const hasMoreOrders  = orders.length > MAX_DASHBOARD_ORDERS;
  const displayOrders  = orders.slice(0, MAX_DASHBOARD_ORDERS);

  return (
    <section className="bg-section rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-text/10">
        <h2 className="font-bold text-xl text-text">Recent Orders</h2>

        {/* "View all" only appears when there are more than 3 orders */}
        {hasMoreOrders && (
          <Link
            to="/orders"
            className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
          >
            View all {orders.length} orders
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Body */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="bg-background p-5 rounded-full mb-4">
            <Package size={40} className="text-secondary opacity-50" aria-hidden="true" />
          </div>
          <p className="text-text font-semibold text-lg mb-1">No orders yet</p>
          <p className="text-secondary text-sm">
            Your orders will appear here once you make a purchase.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
          >
            Start shopping <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div>
          {displayOrders.map((order) => (
            <RecentOrderCard
              key={order.id}
              id={order.id}
              date={order.date}
              status={order.status}
              items={order.items}
              total={order.total}
            />
          ))}

          {/* Footer link — also shown at the bottom when truncated */}
          {hasMoreOrders && (
            <div className="border-t border-text/10 px-6 py-4">
              <Link
                to="/orders"
                className="flex items-center justify-center gap-2 text-sm text-primary font-semibold hover:underline"
              >
                View all {orders.length} orders
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default RecentOrders;
