import { useState, useEffect } from "react";
import { OrdersContext } from "./OrdersContext";
import { useAuth } from "./AuthContext";
import { readOrdersFromStorage } from "../storage/orderStorage";

export function OrdersProvider({ children }) {
  const { user } = useAuth();

  const getOrdersKey = () =>
    user ? `zoozu-orders-${user.email}` : "zoozu-guest-orders";

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const currentKey = getOrdersKey();
    const savedOrders = readOrdersFromStorage(currentKey); // Now passing the key as an argument
    setOrders(savedOrders);
  }, [user]);

  useEffect(() => {
    const currentKey = getOrdersKey();
    localStorage.setItem(currentKey, JSON.stringify(orders));
  }, [orders, user]);

  const addOrder = ({ cartItems, totalPrice, shippingInfo }) => {
    const now = new Date();
    const orderId = `ORD-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Date.now().toString().slice(-4)}`;

    const newOrder = {
      id: orderId,
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
