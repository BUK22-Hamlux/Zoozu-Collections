import { useState, useEffect } from "react";
import { OrdersContext } from "./OrdersContext";
import { useAuth } from "./AuthContext";
import { getUserOrders, saveUserOrders } from "../storage/userStorage";

export function OrdersProvider({ children }) {
  const { user } = useAuth();

  const [orders, setOrders] = useState(() =>
    user ? getUserOrders(user.email) : [],
  );

  useEffect(() => {
    setOrders(user ? getUserOrders(user.email) : []);
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      saveUserOrders(user.email, orders);
    }
  }, [orders, user?.email]);

  const addOrder = ({ cartItems, totalPrice, shippingInfo }) => {
    const now = new Date();
    const id = `ORD-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Date.now().toString().slice(-4)}`;

    const newOrder = {
      id,
      date: now.toISOString().split("T")[0],
      total: totalPrice,
      status: "processing",
      shippingAddress: shippingInfo,
      items: cartItems.map(({ name, quantity, price }) => ({
        name,
        quantity,
        price,
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
