import { useState, useEffect } from "react";
import { OrdersContext } from "./OrdersContext";
import { readOrdersFromStorage, ORDERS_KEY } from "../storage/orderStorage";

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => readOrdersFromStorage());

  // Sync to localStorage on every change
  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = ({ cartItems, totalPrice, shippingInfo }) => {
    const now = new Date();

    // Generate a unique order ID using the current timestamp
    const orderId = `ORD-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Date.now().toString().slice(-4)}`;

    const newOrder = {
      id: orderId,
      // toISOString().split("T")[0] gives "2026-03-25" format
      date: now.toISOString().split("T")[0],
      total: totalPrice,
      status: "processing",
      shippingAddress: shippingInfo,
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);

    return newOrder;
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}
