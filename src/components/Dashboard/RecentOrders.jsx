import RecentOrderCard from "./RecentOrderCard";
import { useOrders } from "../../contexts/OrdersContext";

function RecentOrders() {
  const { orders } = useOrders();

  return (
    <div className="flex flex-col text-text max-h-200 overflow-x-auto w-full bg-section rounded-xl">
      <h2 className="p-6 font-bold text-2xl bg-section border-b border-b-text/10 sticky top-0 left-0">
        Recent Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-center p-12 text-text text-2xl font-semibold">
          No orders yet
        </p>
      ) : (
        orders.map((order) => (
          <RecentOrderCard
            key={order.id}
            items={order.items}
            date={order.date}
            status={order.status}
            id={order.id}
          />
        ))
      )}
    </div>
  );
}

export default RecentOrders;
