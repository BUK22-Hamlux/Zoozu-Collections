import RecentOrderCard from "./RecentOrderCard";
import Orders from "../../data/Orders";

function RecentOrders() {
  return (
    <div className=" flex flex-col text-text max-h-200 overflow-x-auto w-full bg-section rounded-xl">
      <h2 className="p-6 font-bold text-2xl bg-section border-b border-b-text/10 sticky top-0 left-0">
        Recent Orders
      </h2>
      {Orders.length === 0 ? (
        <p className="text-center p-12 text-text text-2xl font-semibold">
          No recent order
        </p>
      ) : (
        Orders.map((order) => (
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
