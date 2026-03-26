export const ORDERS_KEY = "zoozu-orders";

export const readOrdersFromStorage = () => {
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    localStorage.removeItem(ORDERS_KEY);
    return DEMO_ORDERS;
  }
};
