import { createContext, useContext } from "react";

export const OrdersContext = createContext();
export const useOrders = () => useContext(OrdersContext);
