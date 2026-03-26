import { formatCurrency } from "../../utils/formatCurrency";

function RecentOrderCard({ id, date, status, items }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-600/10";
      case "shipped":
        return "text-blue-600 bg-blue-600/10 ";
      case "processing":
        return "text-yellow-600 bg-yellow-600/10";
      default:
        return "text-gray-600 bg-gray-600/10";
    }
  };

  return (
    <div>
      <div className="border-t border-t-text/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-2 items-start mb-4">
          <div>
            <h2 className="font-semibold text-lg">Order #{id}</h2>
            <p className="text-text/70 text-sm">Placed on {date}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className={`h-fit px-4 rounded-2xl ${getStatusColor(status)}`}>
              <p className="text-sm">{status}</p>
            </div>
            <h3 className="font-semibold">
              {formatCurrency(
                items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                ),
              )}
            </h3>
          </div>
        </div>
        {items.map((item) => (
          <div key={item.name} className="flex justify-between mb-2">
            <p className="text-text/70 text-sm">
              {item.name} x {item.quantity}
            </p>
            <p className="text-sm">{formatCurrency(item.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrderCard;
